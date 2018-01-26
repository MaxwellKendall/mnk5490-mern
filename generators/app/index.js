'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    // Make options available
    this.option('skip-welcome-message', {
      desc: 'Skip the welcome message',
      type: Boolean,
      defaults: false
    });

    this.config.save();
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to this private generator for generating a ${chalk.red('MERN')} app`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What would you like to name your app ?',
        default: 'App',
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
      this.templatePath('./public/gitignore'),
      this.destinationPath(`${appName}/public/.gitignore`)
    );

    this.fs.copyTpl(
      this.templatePath('./public/_package.json'),
      this.destinationPath(`${appName}/public/package.json`),
      {
        name: this.props.name,
      }
    );

    this.fs.copyTpl(
      this.templatePath('./public/_bower.json'),
      this.destinationPath(`${appName}/public/bower.json`),
      {
        name: this.props.name,
      }
    );
    this.fs.copy(
      this.templatePath('./public/babelrc'),
      this.destinationPath(`${appName}/public/.babelrc`)
    );
    this.fs.copy(
      this.templatePath('./public/bowerrc'),
      this.destinationPath(`${appName}/public/.bowerrc`)
    );

    this.fs.copy(
      this.templatePath('./public/_webpack.config.js'),
      this.destinationPath(`${appName}/public/webpack.config.js`)
    );

    this.fs.copy(
      this.templatePath('./public/_postcss.config.js'),
      this.destinationPath(`${appName}/public/postcss.config.js`)
    );

    this.fs.copy(
      this.templatePath('./public/_eslintrc.js'),
      this.destinationPath(`${appName}/public/.eslintrc.js`)
    );

    this.fs.copy(
      this.templatePath('./public/_stylelintrc'),
      this.destinationPath(`${appName}/public/.stylelintrc`)
    );

    this.fs.copy(
      this.templatePath('./public/_index.html'),
      this.destinationPath(`${appName}/public/index.html`)
    );

    this.fs.copy(
      this.templatePath('./public/src/_history/_configureHistory.js'),
      this.destinationPath(`${appName}/public/src/history/configureHistory.js`)
    );

    this.fs.copy(
      this.templatePath('./public/_index.js'),
      this.destinationPath(`${appName}/public/src/index.js`)
    );

    this.fs.copy(
      this.templatePath('./public/src/_store/_configureStore.js'),
      this.destinationPath(`${appName}/public/src/store/configureStore.js`)
    );

    this.fs.copy(
      this.templatePath('./public/src/_App.jsx'),
      this.destinationPath(`${appName}/public/src/components/App.jsx`)
    );

    this.fs.copy(
      this.templatePath('./public/src/_reducers/_index.js'),
      this.destinationPath(`${appName}/public/src/reducers/index.js`)
    );

    this.fs.copyTpl(
      this.templatePath('./public/_testSetUp.js'),
      this.destinationPath(`${appName}/public/testSetUp.js`)
    );

    this.fs.copyTpl(
      this.templatePath('./public/tests/components/App.spec.js'),
      this.destinationPath(`${appName}/public/tests/components/App.spec.js`)
    );

    // 2. Generate back end
    this.fs.copy(
      this.templatePath('./auth/_index.js'),
      this.destinationPath(`${appName}/auth/index.js`)
    );

    this.fs.copy(
      this.templatePath('./config/_index.js'),
      this.destinationPath(`${appName}/config/index.js`)
    );

    this.fs.copy(
      this.templatePath('./controllers/_index.js'),
      this.destinationPath(`${appName}/controllers/index.js`)
    );

    this.fs.copy(
      this.templatePath('./models/_index.js'),
      this.destinationPath(`${appName}/auth/index.js`)
    );

    this.fs.copy(
      this.templatePath('./_server.js'),
      this.destinationPath(`${appName}/server.js`)
    );

    this.fs.copy(
      this.templatePath('./gitignore'),
      this.destinationPath(`${appName}/.gitignore`)
    );

    this.fs.copyTpl(
      this.templatePath('./_package.json'),
      this.destinationPath(`${appName}/package.json`),
      {
        name: this.props.name,
      }
    );
  }

  initializing() {
    if (!this.options['skip-welcome-message']) {
      this.log(`Your project ${this.appName} will be bundled under /${this.appName} and contain a react/redux front end bundled under /public and a basic file tree structure for an Express Backend`);
    }
  }

  install() {
    this.composeWith('mnk5490-mern:scss');
    this.composeWith('mnk5490-mern:container');
    process.chdir(`${this.props.name}`);
    this.installDependencies({ npm: false, bower: false, yarn: true });
    process.chdir('public');
    this.installDependencies({ npm: false, bower: false, yarn: true });
  }
};
