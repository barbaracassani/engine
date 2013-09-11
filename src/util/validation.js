var rules = require('./validationRules');

var Validation = function(model) {
    var modelRuleSet = model.name ? rules[model.name] : rules,
        hasOwn = {}.hasOwnProperty,
        key, ruleString, func = 'var value = arguments[0];\r\n var isValid=true;\r\n', str;

    model.rules = model.rules || {};

    for (var i in model.defaults) {
        if (hasOwn.call(model.defaults, i)) {
            func = '';
            console.log(i,model.defaults,modelRuleSet, modelRuleSet[key]);
            ruleString = modelRuleSet[i].split(',');
            for (var a = 0, len = ruleString.length ; a < len ; a++) {
                str = ruleString[a];
                if(!str.indexOf('is ')) {
                    func += ' if (!typeof value !== "' + str.substr(3) + '"){isValid = false}\r\n';
                } else if (!str.indexOf('test ')) {
                    func += ' if (!value.test(' + str.substr(5) + '){isValid = false}\r\n';
                } else if (!str.indexOf('assert ')) {
                    func += ' if (!value ' + str.substr(7) + '){isValid = false}\r\n';
                }
            }
            func += 'return isValid';
            model.rules[i] = new Function(func);
        }
    }
};

module.exports = Validation;