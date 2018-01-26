'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, options) {

  super(args, options);

  // Make options available


  this.option('actionName', {
    desc: 'Use this name for to create action',
    type: String,
    defaults: "action"
  }); 

  this.option('componentName', {
    desc: 'Name of component you are connecting',
    type: String,
    defaults: "Component"
  });

  this.log(this.options['actionName']);
  this.log(this.options['component']);


  this.config.save();
}

  prompting() {
    console.log('prompting - zap');
  }

  writing() {
    // console.log('writing - zap');
    // this.fs.copyTpl(
    //   this.templatePath('_Component.jsx'),
    //   this.destinationPath('src/components/' + this.options['name'] + '.jsx'),
    //   {
    //     name: this.options['name'],
    //   },
    // );

    this.fs.copyTpl(
      this.templatePath('_action.js'),
      this.destinationPath('src/actions/' + this.options['actionName'] + '.js'),
      {
        actionName: this.options['actionName'],
        actionNameCaps: (this.options['actionName']).toUpperCase(),
      },
    );

    // this.fs.copyTpl(
    //   this.templatePath('_Container.jsx'),
    //   this.destinationPath('src/containers/' + this.options['componentName'] + '.jsx'),
    //   {
    //     actionName: this.options['actionName'],
    //     componentName: this.options['componentName'],
    //   },
    // );
  }
};
