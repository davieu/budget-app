var budgetController = (function() {

     var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
     };

     var Income = function (id, description, value) {
         this.id = id;
         this.description = description;
         this.value = value;
     };

     var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
     };

     return {
         addItem: function(type, des, val) {
            var newItem, ID;
            
            // ID = last ID + 1
            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            };
            

            // create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            };

            //push it into our data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
         },

         testing: function() {
            console.log(data);
         }
     };
})();

var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%">' +
                            '<div class="item__description">%description%</div>' +
                            '<div class="right clearfix">' +
                                '<div class="item__value">%value%</div>' +
                                '<div class="item__delete">' +
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer
                html = '<div class="item clearfix" id="expense-%id%">' +
                            '<div class="item__description">%description%</div>' +
                            '<div class="right clearfix">' +
                                '<div class="item__value">%value%</div>' +
                                '<div class="item__percentage">21%</div>' +
                                '<div class="item__delete">' +
                                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;

            //trick to convert list into array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            console.log(fields);
            fieldsArr = Array.prototype.slice.call(fields);
            console.log(fieldsArr);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();
        }
    };
})();

var controller = (function(budgetCtrl, UIctrl){

    var setupEventListeners = function() {

        var DOM = UIctrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    }

    var ctrlAddItem = function() {
        var input, newItem;

        //get the field input data
        input = UIctrl.getInput();

        //add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //add the item to the ui
        UIctrl.addListItem(newItem, input.type);
        //clear the fields
        UIctrl.clearFields();
        //calculate the budget
        //display the budget on the UI

    };

    return {
        init: function() {
            console.log('application started');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();