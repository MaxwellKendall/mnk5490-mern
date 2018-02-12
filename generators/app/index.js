'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.appName = null;

    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false
    });

    this.config.save();
  }

  prompting() {
    this.log(yosay(`Welcome to this private generator for generating a ${chalk.red('React')} app`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What would you like to name your app ?',
        default: 'App',
      },
      {
        type: 'input',
        fullstack: 'bool',
        name: 'fullstack',
        message: 'Do you want to generate a full stack app with express as the back end?',
        default: true,
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    this.config.set('appName', this.props.name);
    this.config.set('test', 'test');
    const appName = this.props.name;

    // 1. Generate front end

    this.fs.copyTpl(
      this.templatePath('./frontEnd/gitignore'),
      this.destinationPath(`${appName}/frontEnd/.gitignore`)
    );

    this.fs.copyTpl(
      this.templatePath('./frontEnd/_package.json'),
      this.destinationPath(`${appName}/frontEnd/package.json`),
      {
        name: this.props.name,
      }
    );

    this.fs.copyTpl(
      this.templatePath('./frontEnd/_bower.json'),
      this.destinationPath(`${appName}/frontEnd/bower.json`),
      {
        name: this.props.name,
      }
    );
    this.fs.copy(
      this.templatePath('./frontEnd/babelrc'),
      this.destinationPath(`${appName}/frontEnd/.babelrc`)
    );
    this.fs.copy(
      this.templatePath('./frontEnd/bowerrc'),
      this.destinationPath(`${appName}/frontEnd/.bowerrc`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/_webpack.config.js'),
      this.destinationPath(`${appName}/frontEnd/webpack.config.js`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/_postcss.config.js'),
      this.destinationPath(`${appName}/frontEnd/postcss.config.js`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/_eslintrc.js'),
      this.destinationPath(`${appName}/frontEnd/.eslintrc.js`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/_stylelintrc'),
      this.destinationPath(`${appName}/frontEnd/.stylelintrc`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/_index.html'),
      this.destinationPath(`${appName}/frontEnd/index.html`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/src/_history/_configureHistory.js'),
      this.destinationPath(`${appName}/frontEnd/src/history/configureHistory.js`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/_index.js'),
      this.destinationPath(`${appName}/frontEnd/src/index.js`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/src/_store/_configureStore.js'),
      this.destinationPath(`${appName}/frontEnd/src/store/configureStore.js`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/src/_App.jsx'),
      this.destinationPath(`${appName}/frontEnd/src/components/App.jsx`)
    );

    this.fs.copy(
      this.templatePath('./frontEnd/src/_reducers/_index.js'),
      this.destinationPath(`${appName}/frontEnd/src/reducers/index.js`)
    );

    this.fs.copyTpl(
      this.templatePath('./frontEnd/_testSetUp.js'),
      this.destinationPath(`${appName}/frontEnd/testSetUp.js`)
    );

    this.fs.copyTpl(
      this.templatePath('./frontEnd/tests/components/App.spec.js'),
      this.destinationPath(`${appName}/frontEnd/tests/components/App.spec.js`)
    );

    // 2. Generate back end
    this.fs.copy(
      this.templatePath('./auth/_index.js'),
      this.destinationPath(`${appName}/backEnd/auth/index.js`)
    );

    this.fs.copy(
      this.templatePath('./config/_index.js'),
      this.destinationPath(`${appName}/backEnd/config/index.js`)
    );

    this.fs.copy(
      this.templatePath('./controllers/_index.js'),
      this.destinationPath(`${appName}/backEnd/controllers/index.js`)
    );

    this.fs.copy(
      this.templatePath('./models/_index.js'),
      this.destinationPath(`${appName}/backEnd/models/index.js`)
    );

    this.fs.copy(
      this.templatePath('./_server.js'),
      this.destinationPath(`${appName}/backEnd/server.js`)
    );

    this.fs.copy(
      this.templatePath('./gitignore'),
      this.destinationPath(`${appName}/backEnd/.gitignore`)
    );

    this.fs.copyTpl(
      this.templatePath('./_package.json'),
      this.destinationPath(`${appName}/backEnd/package.json`),
      {
        name: this.props.name,
      }
    );
  }

  initializing() {
    if (!this.options['skip-welcome-message']) {
      this.log(`React bundled under /frontEnd and a basic file structure for an 
      Express Backend bundled under /backend`);
    }
  }

  install() {
    this.composeWith('mern:scss');
    this.composeWith('mern:container');
    this.composeWith('mern:action');
    this.composeWith('mern:reducer');
    this.composeWith('mern:test');
    process.chdir(`${this.props.name}`);
    this.installDependencies({ npm: false, bower: false, yarn: true });
    process.chdir('frontEnd');
    this.installDependencies({ npm: false, bower: false, yarn: true });
  }
};
