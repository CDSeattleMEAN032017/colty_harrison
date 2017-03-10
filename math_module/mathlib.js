module.exports = {
    add: function(num1, num2) {
         return num1 + num2;
    },
    multiply: function(num1, num2) {
         return num1 * num2;
    },
    square: function(num) {
        return num * num;
    },
    random: function(num1, num2) {
        var range = num2 - num1;
        return Math.floor(Math.random() * range + num1);
    }
};
