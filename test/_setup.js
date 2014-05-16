var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var chaiGulpHelpers = require("../index.js");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiGulpHelpers);
