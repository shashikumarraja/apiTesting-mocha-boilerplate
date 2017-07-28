//Constains functions to validate the api details

exports.dataTypeValidator = function (res) {
    res.body.should.have.property('id').which.is.a.Number();
    res.body.should.have.property('name').which.is.a.String();
    res.body.should.have.property('fName').which.is.a.String();
    res.body.should.have.property('lName').which.is.a.String();
    res.body.should.have.property('age').which.is.a.Number();
    res.body.should.have.property('powers').which.is.an.Array().and.not.be.empty();
    res.body.should.have.property('killer').which.is.a.Boolean();
};
exports.dataValidator = function (res, name, fName, lName, age, powers, killer) {
    res.body.name.should.equal(name);
    res.body.fName.should.equal(fName);
    res.body.lName.should.equal(lName);
    res.body.age.should.equal(age);
    res.body.powers.should.eql(powers);
    res.body.killer.should.equal(killer);
};