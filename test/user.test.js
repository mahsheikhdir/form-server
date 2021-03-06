import { expect, request, BASE_URL } from './setup';
describe('User creation and authentication', () => {
    it('registers a user', done => {
        const data = {username: 'mahdir', password: 'a_bad_password', email : "mahdir@email.com"}
        request
            .post(`${BASE_URL}/register`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.nested.property('createdUser[0].username', 'mahdir');
                expect(res.body).to.have.nested.property('createdUser[0].email', 'mahdir@email.com');
                done();
            })
    });

    it('does not register user with space in name', done => {
        const data = {username: 'mah dir', password: 'a_bad_password', email : "mahdir@email.com"}
        request
            .post(`${BASE_URL}/register`)
            .send(data)
            .expect(400)
            .end((err, res) => {
                done();
            })
    });

    it('does not register user with same name', done => {
        const data = {username: 'mah dir', password: 'a_bad_password', email : "mahdir@email.com"}
        request
            .post(`${BASE_URL}/register`)
            .send(data)
            .expect(400)
            .end((err, res) => {
                done();
            })
    });

    it('logins a user', done => {
        const data = {username: 'mahdir', password: 'a_bad_password'}
        request
            .post(`${BASE_URL}/login`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.nested.property('loggedInUser.username', 'mahdir');
                expect(res.body).to.have.nested.property('loggedInUser.email', 'mahdir@email.com');
                done();
            })
    });

    it('able to access protected route after logging in', done => {
        request
            .get(`${BASE_URL}/dashboard`)
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).equal('successfully entered protected route');
                done();
            })
    });

    it('returns all users that are registered', done => {
        request
            .get(`${BASE_URL}/users`)
            .expect(200)
            .end((err, res) => {
                if(err) done(err);
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('users');
                expect(res.body.users[0].username).to.deep.equal('john');
                expect(res.body.users[1].username).to.deep.equal('mahdir');
                done();
            })
    });


  
});