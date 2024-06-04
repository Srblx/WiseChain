// // Load modules
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import httpStatus from 'http-status';

// // Config tests
// const { expect } = chai;
// chai.use(chaiHttp);
// chai.config.includeStack = true;

// // Load utils
// import { prisma } from '@/_utils/constante.utils';
// import { app } from '@/app'; // Assuming you have an Express app

// // Test data
// import { TestData } from './test-data';

// describe('<=== Entity "Auth" ===>', () => {
//   beforeEach(async () => {
//     // Clear the database before each test
//     await prisma.user.deleteMany();
//   });

//   after(async () => {
//     // Disconnect from the database after all tests
//     await prisma.$disconnect();
//   });

//   it('Should register a new user', async () => {
//     try {
//       const { status, body } = await chai
//         .request(app)
//         .post('/api/signup')
//         .send(TestData.validUser);

//       expect(status).to.equal(httpStatus.CREATED);
//       expect(body.token).to.exist;
//       expect(body.pseudo).to.equal(TestData.validUser.pseudo);

//       return Promise.resolve();
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   });

//   it('Should not register a user with an existing email', async () => {
//     try {
//       // First, create a user
//       await chai.request(app).post('/api/signup').send(TestData.validUser);

//       // Then, try to register with the same email
//       const { status, body } = await chai
//         .request(app)
//         .post('/api/signup')
//         .send(TestData.validUser);

//       expect(status).to.equal(httpStatus.BAD_REQUEST);
//       expect(body.error).to.equal("L'email est déjà utilisé.");

//       return Promise.resolve();
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   });

//   it('Should not register a user with an existing pseudo', async () => {
//     try {
//       // First, create a user
//       await chai.request(app).post('/api/signup').send(TestData.validUser);

//       // Then, try to register with the same pseudo but different email
//       const { status, body } = await chai
//         .request(app)
//         .post('/api/signup')
//         .send({ ...TestData.validUser, mail: 'anotheremail@test.com' });

//       expect(status).to.equal(httpStatus.BAD_REQUEST);
//       expect(body.error).to.equal('Le pseudo est déjà utilisé.');

//       return Promise.resolve();
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   });

//   it('Should not register a user with invalid data', async () => {
//     try {
//       const { status, body } = await chai
//         .request(app)
//         .post('/api/signup')
//         .send(TestData.invalidUser);

//       expect(status).to.equal(httpStatus.BAD_REQUEST);
//       expect(body.error).to.exist;

//       return Promise.resolve();
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   });
// });