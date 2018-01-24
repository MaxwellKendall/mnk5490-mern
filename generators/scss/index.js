'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

//   constructor(args, options) {
//
//   super(args, options);
//
//   // Make options availabl
//
//
//   this.config.save();
// }

  prompting() {
  }

  writing() {

    this.fs.copy(
      this.templatePath('_global.scss'),
      this.destinationPath('src/scss/global.scss'),

    );
  }
};
