'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.appName = this.config.get('appName');
    this.option('name', {
      desc: 'Use this name for test generator',
      type: String,
      defaults: 'Component'
    });

    this.option('path', {
      desc: 'path for test begining from root/test',
      type: String,
    });

    this.option('component', {
      desc: 'Will generate test for a component',
      type: Boolean,
      defaults: true
    });

    this.option('action', {
      desc: 'Will generate test for an action',
      type: Boolean,
      defaults: false
    });

    this.option('reducer', {
      desc: 'Will generate test for a reducer',
      type: Boolean,
      defaults: false
    });


    this.config.save();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_testSetup.js'),
      this.destinationPath(`${this.appName}/frontEnd/testSetup.js`),
      {
        name: this.options.name,
      }
    );

    const componentDestination = this.options.path
      ? `${this.appName}/frontEnd/test/component/${this.options.path}/${this.options.name}.spec.js`
      : `${this.appName}/frontEnd/test/component/${this.options.name}.spec.js`;

    const actionDestination = this.options.path
      ? `${this.appName}/frontEnd/test/actions/${this.options.path}/${this.options.name}.spec.js`
      : `${this.appName}/frontEnd/test/actions/${this.options.name}.spec.js`;

    const reducerDestination = this.options.path
      ? `${this.appName}/frontEnd/test/reducers/${this.options.path}/${this.options.name}.spec.js`
      : `${this.appName}/frontEnd/test/reducers/${this.options.name}.spec.js`;


    this.fs.copyTpl(
      this.templatePath('_Component.js'),
      this.destinationPath(componentDestination),
      {
        name: this.options.name,
      }
    );

    this.options.action ? this.fs.copyTpl(
      this.templatePath('_action.js'),
      this.destinationPath(actionDestination),
        {
          name: this.options['name'],
          path: actionDestination,
        }
      ) : null;

    this.options.action ? this.fs.copyTpl(
      this.templatePath('_reducer.js'),
      this.destinationPath(reducerDestination),
        {
          name: this.options['name'],
          path: reducerDestination,
        }
      ) : null;
  };
};
