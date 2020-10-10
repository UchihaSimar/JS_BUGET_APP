//Budget Controlelr
var budgetController = (function(){
    var data = {
        allItems : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    }
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    return {
        addItem: function(type, des, val){
            var newItem;
            var ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            }else if(type === 'inc'){
                newItem = new Income(ID,des,val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    }
})();

//UI Controller
var UIController = (function(){
    var DOMStrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }
    return {
        getInput: function(){
            return{
                type :document.querySelector(DOMStrings.inputType).value, 
                description: document.querySelector(DOMStrings.inputDescription).value,
                value:document.querySelector(DOMStrings.inputValue).value
            }
        },
        addListItem: function(obj, type){
            var html,newHtml,element;
            if(type == 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMStrings.expenseContainer
                html = ' <div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i><button></div></div></div>'
            }

            newHtml = html.replace('%id%',obj.id).replace('%description%',obj.description).replace('%value%',obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        getDomstrings: function(){
            return DOMStrings;
        }
    };
})();


//Global App Controller
var controller = (function(budgetCtrl,UICtrl){
    var setupEventListeners = function(){
        
        var DOM = UICtrl.getDomstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.code === "Enter"){
                ctrlAddItem();
            }
        })
    }

    var ctrlAddItem = function(){
        var input,newItem;
        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type,input.description,input.value);
        UICtrl.addListItem(newItem,input.type);
    }

    return{
        init: function(){
            setupEventListeners();
        }
    }
})(budgetController, UIController);

controller.init();