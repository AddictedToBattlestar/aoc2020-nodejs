import express from 'express'
import {Express} from 'express-serve-static-core'
import logger from '@exmpl/utils/logger'

export async function createServer(): Promise<Express> {
  const server = express();
  server.get('/', (req, res) => {
    res.send('Hello world!!!');
    logger.info('Logger test');
  })
  return server;
}