import { expect, request, BASE_URL } from './setup';

describe('Sites ', () => {

    it('Asks for authentication', done => {
        request
            .post(`${BASE_URL}/sites`)
            .expect(403)
            .end((err, res) => {
                expect(res.body.message).equal('Not authenticated');
                done();
            })
    });

    it('registers a user', done => {
        const data = {username: 'john', password: 'a_bad_password', email : "john@email.com"}
        request
            .post(`${BASE_URL}/register`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                done();
            })
    });

    it('logins a user', (done) => {
      const data = { username: 'john', password: 'a_bad_password' };
      request
        .post(`${BASE_URL}/login`)
        .send(data)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Retrives the users sites', (done) => {
        const data = { username: 'john', password: 'a_bad_password' };
        request
          .get(`${BASE_URL}/sites`)
          .expect(200)
          .end((err, res) => {
            console.log(res.body);
            done();
          });
      });

      let api_key;
      it('User creates a site', (done) => {
        const data = { name: 'mysite'};
        request
          .post(`${BASE_URL}/sites`)
          .send(data)
          .expect(200)
          .end((err, res) => {
            api_key = res.body.newSite[0].api_key;
            console.log(api_key);
            done();
          });
      });

      it('User sends data to site', (done) => {
        let data = {name: 'matt', comment: "nice website"};
        request
          .post(`${BASE_URL}/` + api_key)
          .send(data)
          .expect(200)
          .end((err, res) => {
            done();
          });
      });

      it('Retrives the users sites and new data', (done) => {
        request
          .get(`${BASE_URL}/sites`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.sites[0]['form_data']['default'][0]).to.deep.equal({name: 'matt', comment: "nice website"});
            done();
          });
      });

      it('User sends data to site with form', (done) => {
        let data = {name: 'matt', comment: "nice website"};
        request
          .post(`${BASE_URL}/` + api_key + '/profile')
          .send(data)
          .expect(200)
          .end((err, res) => {
            done();
          });
      });
  
});