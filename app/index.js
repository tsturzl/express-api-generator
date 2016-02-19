//Template Compiler

/*
template vars
{
  name: < Name, camelCase
  namePlural: < name + 's'
  controllerName: < Name UpperCase
  schemaName: < name + "Schema"
  description: < Text description to put in header comment
  type: < What type of file is it(eg. controller, model, route, etc)
  author: < Who is the creating author/s
}
 */

var fs        = require('fs');
var path      = require('path');
var Mustache  = require('mustache');

//Main function
function main(vars) {
  ensureMiddleware(vars);
  controller(vars);
  model(vars);
  manager(vars);
  route(vars);
}

//Ensure all middleware exists
function ensureMiddleware(vars) {
  console.log("Generate Middleware");
  vars.type = 'middleware';

  var middlewareDir = path.join(__dirname, 'templates/middleware');
  fs.readdirSync(middlewareDir).forEach(function(fileName) {
    var filePath = path.join(process.cwd(), 'lib/middleware', fileName);
    //skip if exists
    if(fs.statSync(filePath).isFile()) return console.log("Skipping " + fileName);

    console.log("Generate " + fileName);

    var templatePath = path.join(middlewareDir, fileName);
    var data = fs.readFileSync(templatePath);

    var code = Mustache.render(data, vars);

    fs.writeFileSync(filePath, code);
  });
}

//Generate controller
function controller(vars) {
  vars.type = 'controller';

  var filePath = path.join(process.cwd(), 'lib/controllers', vars.controllerName + '.js');
  //error if exists
  if(fs.statSync(filePath).isFile()) throw new Error("Controller already exists");
  var templatePath = path.join(__dirname, 'controller-model/controller.js');
  var data = fs.readFileSync(templatePath);

  var code = Mustache.render(data, vars);

  fs.writeFileSync(filePath, code);
}

//Generate model
function model(vars) {
  vars.type = 'model';

  var filePath = path.join(process.cwd(), 'lib/models', vars.name + '.js');
  //error if exists
  if(fs.statSync(filePath).isFile()) throw new Error("Model already exists");
  var templatePath = path.join(__dirname, 'controller-model/model.js');
  var data = fs.readFileSync(templatePath);

  var code = Mustache.render(data, vars);

  fs.writeFileSync(filePath, code);
}

//Generate manager
function manager(vars) {
  vars.type = 'manager';

  var filePath = path.join(process.cwd(), 'lib/managers', vars.name + '.js');
  //error if exists
  if(fs.statSync(filePath).isFile()) throw new Error("Manager already exists");
  var templatePath = path.join(__dirname, 'controller-model/manager.js');
  var data = fs.readFileSync(templatePath);

  var code = Mustache.render(data, vars);

  fs.writeFileSync(filePath, code);
}

//Generate route
function route(vars) {
  vars.type = 'route';

  var filePath = path.join(process.cwd(), 'lib/routes', vars.name + '.js');
  //error if exists
  if(fs.statSync(filePath).isFile()) throw new Error("Route already exists");
  var templatePath = path.join(__dirname, 'controller-model/route.js');
  var data = fs.readFileSync(templatePath);

  var code = Mustache.render(data, vars);

  fs.writeFileSync(filePath, code);
}