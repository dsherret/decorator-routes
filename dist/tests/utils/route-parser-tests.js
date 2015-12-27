var assert = require("assert");
var utils_1 = require("./../../utils");
describe("RouteParser", function () {
    describe("constructor()", function () {
        it("should throw an error when someone provides no value for a query param", function () {
            assert.throws(function () {
                new utils_1.RouteParser("/notes?myVal");
            }, Error, "A query parameter must have an equals sign: myVal");
        });
    });
    describe("getParameterNames()", function () {
        it("should have no parameters when no parameters are specified", function () {
            var parser = new utils_1.RouteParser("/notes/1");
            assert.equal(parser.getParameterNames().length, 0);
        });
        it("should have the parameter when in the url", function () {
            var parser = new utils_1.RouteParser("/notes/:myparam");
            assert.equal(parser.getParameterNames()[0], "myparam");
        });
        it("should have the parameter when in the url twice", function () {
            var parser = new utils_1.RouteParser("/:myparam/:myparam2");
            assert.equal(parser.getParameterNames()[0], "myparam");
            assert.equal(parser.getParameterNames()[1], "myparam2");
        });
        it("should have the parameter when in the query string", function () {
            var parser = new utils_1.RouteParser("/notes/1?user=:user");
            assert.equal(parser.getParameterNames()[0], "user");
        });
        it("should have the parameter when in the query string twice", function () {
            var parser = new utils_1.RouteParser("/notes/1?user=:user&date=:date");
            assert.equal(parser.getParameterNames()[0], "user");
            assert.equal(parser.getParameterNames()[1], "date");
        });
        it("should not return a parameter name more than once", function () {
            var parser = new utils_1.RouteParser("/notes/1?user=:user&date=:user");
            assert.equal(parser.getParameterNames().length, 1);
        });
    });
    describe("getUrlCodeString()", function () {
        it("should return a slash when the string is null", function () {
            var parser = new utils_1.RouteParser(null);
            assert.equal(parser.getUrlCodeString(), "\"/\"");
        });
        it("should return a slash when the string is empty", function () {
            var parser = new utils_1.RouteParser("");
            assert.equal(parser.getUrlCodeString(), "\"/\"");
        });
        it("should work with just url parts", function () {
            var parser = new utils_1.RouteParser("/notes/1");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1\"");
        });
        it("should ignore trailing slash", function () {
            var parser = new utils_1.RouteParser("/notes/1/");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1\"");
        });
        it("should add a slash at the beginning when not starting with http://", function () {
            var parser = new utils_1.RouteParser("notes/1");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1\"");
        });
        it("should not add slash at the beginning when starting with http://", function () {
            var parser = new utils_1.RouteParser("http://test.com/notes/1");
            assert.equal(parser.getUrlCodeString(), "\"http://test.com/notes/1\"");
        });
        it("should work with one query parameter", function () {
            var parser = new utils_1.RouteParser("/notes/1?myparam=test");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1?myparam=test\"");
        });
        it("should work with multiple query parameters", function () {
            var parser = new utils_1.RouteParser("/notes/1?myparam=test&myotherparam=t");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1?myparam=test&myotherparam=t\"");
        });
        it("should strip a duplicate query parameter", function () {
            var parser = new utils_1.RouteParser("/notes/1?myparam=test&myparam=something");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1?myparam=test\"");
        });
        it("should replace the url string values", function () {
            var parser = new utils_1.RouteParser("/notes/:noteID");
            assert.equal(parser.getUrlCodeString(), "\"/notes/\" + noteID");
        });
        it("should replace the query parameter values", function () {
            var parser = new utils_1.RouteParser("/notes/1?myparam=:value&otherone=:other");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1?myparam=\" + value + \"&otherone=\" + other");
        });
        it("should replace the query parameter keys", function () {
            var parser = new utils_1.RouteParser("/notes/1?:key=value&:other=other");
            assert.equal(parser.getUrlCodeString(), "\"/notes/1?\" + key + \"=value&\" + other + \"=other\"");
        });
    });
});

//# sourceMappingURL=route-parser-tests.js.map
