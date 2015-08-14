var
  should = require('should'),
  acpiclient = require('./../index.js');

describe('acpiclient', function () {

  it('is a function', function () {
    acpiclient.should.be.a.Function();
  });

  it('works', function (done) {
    acpiclient(function (error, data) {
      if (error) {
        done(error);
      }
      Object.keys(data.batteries).map(function (b) {
        data.batteries[b].status.should.be.a.String;
        data.batteries[b].charge.should.be.a.Number;
        data.batteries[b].charge.should.be.within(0, 100);
        data.batteries[b].rate.should.be.a.String;
      });
      Object.keys(data.adapter).map(function (b) {
        data.adapter[b].onLine.should.be.a.Boolean;
      });
      Object.keys(data.thermal).map(function (b) {
        data.thermal[b].status.should.be.a.equal('ok');
        data.thermal[b].temp.should.be.within(-273, 1370);//melting point of steel)
        data.thermal[b].degrees.should.be.a.equal('Celsius');
      });
      Object.keys(data.cooling).map(function (b) {
        data.cooling[b].status.should.be.a.String;
      });
      data.misc.should.be.an.Array;
      done();
    });
  });
});