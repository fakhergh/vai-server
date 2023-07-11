import 'reflect-metadata';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { useExpressServer, getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, MONGODB_URI } from '@config';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { authorizationChecker } from '@middlewares/auth.middleware';
import { currentUserChecker } from '@middlewares/currentUser.middleware';
import * as mongoose from 'mongoose';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    this.initializeSwagger(Controllers);
    this.initializeErrorHandling();
  }

  public async connectToDatabase() {
    try {
      await mongoose.connect(MONGODB_URI);
      logger.info(`Connected to database`);
    } catch (e) {
      logger.error(`Failed connecting to database`);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      authorizationChecker,
      currentUserChecker,
      cors: {
        origin: ORIGIN,
        credentials: CREDENTIALS,
      },
      routePrefix: '/api',
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const schemas: { [k: string]: any } = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const routingControllersOptions: RoutingControllersOptions = {
      controllers: controllers,
      routePrefix: '/api',
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      info: {
        description: 'Generated with `Fakher Ghouili`',
        title: 'VAI api docs',
        version: '1.0.0',
      },
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}