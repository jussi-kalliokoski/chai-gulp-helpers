"use strict";

var through = require("through2");
var File = require("vinyl");
var AssertionError = require("chai").AssertionError;

describe("chai-gulp-helpers", function () {
    var expected, actual, assertion;

    beforeEach(function () {
        expected = through.obj();
        actual = through.obj();
        assertion = actual.should.produce.sameFilesAs(expected);
    });

    it("should pass if the builds match", function () {
        expected.push(new File({
            cwd: "/expected/",
            base: "/expected/test/",
            path: "/expected/test/foo.file",
            contents: new Buffer("meow")
        }));

        actual.push(new File({
            cwd: "/actual/",
            base: "/actual/test/",
            path: "/actual/test/foo.file",
            contents: new Buffer("meow")
        }));

        expected.emit("end");
        actual.emit("end");
        return assertion;
    });

    it("should fail if the contents of the files don't match", function () {
        expected.push(new File({
            cwd: "/expected/",
            base: "/expected/test/",
            path: "/expected/test/foo.file",
            contents: new Buffer("meow")
        }));

        actual.push(new File({
            cwd: "/actual/",
            base: "/actual/test/",
            path: "/actual/test/foo.file",
            contents: new Buffer("moo")
        }));

        expected.emit("end");
        actual.emit("end");
        return assertion.should.be.rejectedWith(AssertionError);
    });

    it("should fail if an expected file is missing", function () {
        expected.push(new File({
            cwd: "/expected/",
            base: "/expected/test/",
            path: "/expected/test/foo.file",
            contents: new Buffer("meow")
        }));

        expected.push(new File({
            cwd: "/expected/",
            base: "/expected/test/",
            path: "/expected/test/bar.file",
            contents: new Buffer("moo")
        }));

        actual.push(new File({
            cwd: "/actual/",
            base: "/actual/test/",
            path: "/actual/test/foo.file",
            contents: new Buffer("meow")
        }));

        expected.emit("end");
        actual.emit("end");
        return assertion.should.be.rejectedWith(AssertionError);
    });

    it("should fail if there's an extra file in actual files", function () {
        expected.push(new File({
            cwd: "/expected/",
            base: "/expected/test/",
            path: "/expected/test/bar.file",
            contents: new Buffer("meow")
        }));

        actual.push(new File({
            cwd: "/actual/",
            base: "/actual/test/",
            path: "/actual/test/foo.file",
            contents: new Buffer("meow")
        }));

        actual.push(new File({
            cwd: "/actual/",
            base: "/actual/test/",
            path: "/actual/test/bar.file",
            contents: new Buffer("moo")
        }));

        expected.emit("end");
        actual.emit("end");
        return assertion.should.be.rejectedWith(AssertionError);
    });
});
