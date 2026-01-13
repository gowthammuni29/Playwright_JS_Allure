module.exports = {
  default: {
    require: [
      'step-definitions/**/*.js',
      'support/**/*.js'
    ],
    paths: ['features/**/*.feature'],
    format: [
      'progress',
      'allure-cucumberjs'
    ],
    publishQuiet: true
  }
};