module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${ process.env.NODE_ENV === 'development' ? 'dist' : 'src'}/**/*.entity{.ts,.js}`],
  migrations: [`${ process.env.NODE_ENV === 'development' ? 'dist' : 'src'}/**/migrations/*{.ts,.js}`],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/**/migrations',
  },
  synchronize: false,
  logging: false,
};
