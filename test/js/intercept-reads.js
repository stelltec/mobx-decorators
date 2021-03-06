import {observable} from 'mobx'
import {_interceptReads} from '../../src'


describe('@interceptReads', () => {
  it('should throw if @interceptReads called without params', () => {
    (() => class User {
      @_interceptReads
      @observable
      loggedIn = false;
    }).should.throw()
  });


  it('should handler be called', () => {
    let loginCount = -1;

    class User {
      @_interceptReads(value => {
        loginCount = value;
        return value;
      })
      @observable
      loginCount = 0;
    }

    const user = new User();
    user.should.have.property('loginCount').which.is.equal(0);
    loginCount.should.be.equal(0);
  });


  it('should override value works', () => {
    class User {
      @_interceptReads(value => 1)
      @observable
      loginCount = 0;
    }

    const user = new User();
    user.should.have.property('loginCount').which.is.equal(1);
  });
});
