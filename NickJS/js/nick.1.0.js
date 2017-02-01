(function(window){
	/**
	 * @作者                   崔传腾
	 * @author   nick
	 * @email    401541212@qq.com
	 * @version  1.0
	 * @qq       401541212
	 * 本工具库开源开放欢迎提供宝贵建议或意见
	 */
	//启用严格模式
	'use strict';
	
	var attr_length = 'length';
	
	var attr_substr = 'substr';
	
	var attr_replace = 'replace';
	
	var attr_split = 'split';
	
	var attr_toLowerCase = 'toLowerCase';
	
	var attr_toUpperCase = 'toUpperCase';
	
	var attr_indexOf = 'indexOf';
	
	var attr_shift = 'shift';
	
	var attr_unshift = 'un'+attr_shift;
	
	var attr_push = 'push';
	
	var attr_pop = 'pop';
	
	var attr_slice = 'slice';
	
	var attr_splice = 'splice';
	
	var attr_concat = 'concat';
	
	var attr_sort = 'sort';
	
	var attr_call = 'call';
	
	var attr_apply = 'apply';
	
	var attr_extend = 'extend';
	
	var attr_nick = 'nick_';
	
	var attr_prototype = 'prototype';
	
	var attr_fn = 'fn';
	
    var attr_parentNode = 'parentNode';
    
	var attr_documentElement = 'documentElement';
	
	var attr_querySelectorAll = 'querySelectorAll';
	
	var attr_context = 'context';
	
	var attr_test = 'test';
	
	var attr_getComputedStyle = 'getComputedStyle';
	
	var pattern_space = /\s+/;
	
	var dataTypes = 'string number array function object boolean'[attr_split](' ');
	
	var undefined;
	
	var real = !0;
	
	var fake = !real;
	
	var empty = '';
	
	var vacancy = null;
	
	var document = window.document;
	
	//检测并返回数据的真实类型
	//Detection and return data type
	
	var type = function(data){
		
		return {}.toString[attr_call](data)[attr_slice](8, -1)[attr_toLowerCase]();
	};
	
	//强制转换数据为数字，即便失败也返回0
	//Forced conversion to digital data, even if failure also returns 0
	
	var toNumber = function(data) {

		data = parseFloat(data);

		return isNaN(data) ? 0 : data

	};
	
	//检测数据是否为字符串，返回布尔值
	//Detect whether the data as a string, return Boolean value
	
	var isString = function(data){
			
		return type(data) == dataTypes[0]
			
	};
	
	
	//检测数据类型是否为数组，返回布尔值
	//Testing data types to an array, returns a Boolean value
	
	var isArray = function(data){
			
		return type(data) == dataTypes[2]
			
	};
		
	//检测数据类型是否为函数，返回布尔值
	//To test whether the data type as the function, returns a Boolean value
	
	var isFunction = function(data){
			
		return type(data) == dataTypes[3]
			
	}	
	//检测数据类型是否为对象，返回布尔值
	//To test whether the data type as the object, return Boolean value
	
	var isObject = function(data){
			
		return type(data) == dataTypes[4]
			
	};
	
	//检测数据是否为window对象，返回布尔值
	//Whether testing data for the window object, return Boolean value
	
	var isWindow = function(data) {

		return vacancy != data && data == data.window

	};
	
	//检测数据是否为html元素，为了选择器可以选中window因此将拥有节点类型及window对象都视为"html元素"，返回布尔值
	//Whether testing data to HTML elements, for the sake of the selector to select window will therefore have a node type and window object as "HTML elements", returns a Boolean value
	
	var isElement = function(element){
		
		element = element || {};
		
		return element instanceof HTMLElement || element.nodeType || isWindow(element)
		
	};
	
	//检测数据是否通过nick实例化，返回布尔值
	//Is the data detected by Nick instantiation, return Boolean value
	
	var isNick = function(data){
		
		return data ? data instanceof nick : fake
	};
	
	
	//数据遍历函数，可对任何允许遍历的数据进行遍历，在回调函数中可以返回数据但遍历将终止
	//Data traversal functions, can be of any data allows traversal traversal, can return data in the callback function but traversal terminates
	
	var each = function(data, callback) {
			
		var data = data  || fake;
			
		var key = 0;
			
		var length = data[attr_length];
			
		var returns;
			
		if(!isFunction(callback)) return;
		
		//如果数据的长度属性不是未定义则使用索引++方式遍历，否则将使用in的方式遍历
		//If the length of the data attribute is not undefined the traversal, using the index + + ways will be used in the way of traversal
		
		if(length!==undefined){
				
			for(; key < length; key++) {
				
				//执行回调函数并获取返回值，如果返回值不是未定义则返回数据并终止遍历
				//Implement the callback function and obtain the return value, if the return value is undefined and terminate it returns data traversal
				
				returns = callback[attr_call](data[key], key , data);
	
				if(returns !== undefined) return returns
				
			}
			
		}else{
				
			for(key in data) {
	
				returns = callback[attr_call](data[key], key , data);
	
				if(returns !== undefined) return returns
			}
				
		}
			

	};
		
	//检测数据中是否包含指定内容，对数组、对象、字符串等均可使用，返回布尔值或键名
	//Does it include testing data for a specified content, an array, object, string, etc all can use, return Boolean values or key name
	
	var	inArray = function(search, data, index) {
		
		//如果数据为数组且要检索的内容不是函数则使用indexof方法否则将使用遍历方法
		//If the data for the array with not function is used to retrieve the content method indexof or traversal methods will be used
		
		var result = isArray(data)  && !isFunction(search) ? data[attr_indexOf](search) : each(data, function(i) {
				
			//如果检索的内容为函数则将数据转换成字符串进行比较
			//If the content of the retrieval of function is to convert data into string comparison
			
			if( isFunction(search) ? empty+this == search+empty : this == search) return i

		});
		
		//默认返回布尔值，如果第三参数为真则返回索引值，若未找到返回-1
		//The default return Boolean value, if the third parameter to true is returned index value, if return 1 was not found
		
		return result === undefined || result == -1 ?  index ? -1 : fake : index? result : real;

	};
	
	//将数据转换为数组且可限制起始位置与结束位置，返回新数组
	//Converts data array and can limit the starting position and end position, return the new array
	
	var toArray = function(data,startIndex,endIndex){
		
		var arr = [];
		
		each(data,function(){
			
			arr[attr_push](this)
		});
		
		return arr[attr_slice](startIndex,endIndex)
		
	};
	
	//清除字符串左侧空白或指定内容，返回新的字符串
	//Remove the string on the left side of the blank, or specify the content, returns a new string
	
	var	ltrim = function(str, charlist, direction) {

		charlist = charlist ? charlist + '+' : empty;
			
		return(str + empty)[attr_replace](new RegExp((direction ? empty : '^') + (charlist || '[\\s\\r\\n]+') + (direction ? '$' : empty)), empty);

	};
	
	
	//清除字符串右侧空白或指定内容，返回新的字符串
	//Remove the string on the right side blank, or specify the content, returns a new string
	
	var	rtrim = function(str, charlist) {

		return ltrim(str, charlist, real)

	};

	//清除字符串首尾空白或指定内容，返回新的字符串
	//Remove the string fore and aft blank, or specify the content, returns a new string
	
	var	trim = function(str, charlist) {

		return rtrim(ltrim(str, charlist), charlist)
	};
	
	
	//将数据进行扩展合并，第一个参数为数据，之后的参数将合并到数据中，默认允许覆盖原有属性，最后一个参数全等于假则禁止覆盖
	//To expand data consolidation, the first parameter to the data, after the parameters will be incorporated into the data, the default allows overlay attribute, the last parameter all banned coverage equal to false
	
	var extend = function(){
		
		var self;
		
		//将参数转换为数组以便使用数组方法
		//The parameter is converted to an array in order to use array method
			
		var itmes = toArray(arguments);
			
		//第一个元素为数据源
		//The first element is the data source
		
		var target = itmes[attr_shift]();
		
		//若最后一个元素全等于假则删除最后一个元素且禁止覆盖否则允许覆盖
		//If the last element is equal to fake it deletes the last element and banning coverage or coverage
		
		var cover = itmes[itmes[attr_length]-1] === fake ? itmes[attr_pop]() || real: fake;
		
		//遍历参数列表进行数据合并
		//Traverse parameter list data merging
		
		each(itmes,function(){
				
			each(this,function(i){
					
				self = this;
				
				//如果覆盖为真则进行覆盖否则未定义时进行追加
				//If coverage is true is supplementary to cover or undefined
				
				target[i] =  cover ?  target[i]===undefined ? self : target[i] :self;
					
			})
				
		})
		
	};
	
	//获取浏览器前缀
	//Access to the browser prefix
	
	var browser = (function(){
		
		//获取html根节点样式
		//Get HTML root node
		var style = window[attr_getComputedStyle](document[attr_documentElement],empty);
		
		var self;
		
		//遍历浏览器前缀检测有效样式属性名并返回浏览器前缀
		//Traverse the browser prefix to detect effective style attribute name prefix and returned to the browser
		
		return each('webkit Moz o ms '[attr_split](pattern_space),function(){
			
			self = this;
			
			if(style[(!self?'t':self+'T')+'ransform']!==undefined) return self
			
		}) || empty
		
	})()[attr_toLowerCase]();
	
	//根据浏览器前缀获取选择器匹配方法名
	//According to the browser prefix for selector to match the method name
	
	var attr_matchesSelector = browser+(browser?'M':'m')+'atchesSelector';
	
	//核心函数对外开放的全局接口
	//The core function of opening to the outside world global interface
	
	var nick = function(selector,context){
		
		return new nick.fn.init(selector,context)
		
	};
	
	//自动遍历对象并为对象绑定方法，第一个参数为要遍历的对象，第二个参数为回调函数，第三个参数为要传递的参数列表
	//Automatically traverse objects and object binding method, the first parameter to traverse the object, the second parameter to the callback function, the third parameter to pass argument list
	
	var bind = function(self,callback,argumentList){
			
		var returns;
		
		var argumentList = argumentList ? toArray(argumentList) : [];

		if(self && isFunction(callback))
			
			//遍历对象执行回调函数并获取返回值，通过apply方法执行并传递参数列表
			//Traverse object callback function and obtain the return value, through the apply method to execute and deliver argument list
				
			returns = each(self,function(i){
					
				return callback[attr_apply](this,[i][attr_concat](argumentList))
				
			});
		
		//如果回调函数的返回值是未定义则返回对象本身，否则返回回调函数的返回值
		//If the callback function, the return value is undefined it returns the object itself, or to return to the callback function return values
			
		return returns===undefined ? self : returns
			
	};
	
	//自动遍历选中的元素并执行所指定的回调函数，将回调函数的返回值以数组形式返回，最后一个参数指定要传递给回调函数的元素属性
	//Automatic traverse the selected elements and perform the specified callback function, the callback function return values returned in the form of an array, the last parameter specifies the element attributes to be passed to the callback function
	
	var userCallbackReturns = function(myself,callback,attr){
		
		var $this;
		
		var returns = [];
		
		var isCallback = isFunction(callback);
		
		each(myself,function(i){
			
			//执行回调函数并将this指向当前元素，回调函数的第一个参数为当前元素索引值，第二个参数为当前元素的属性
			//Implement the callback function and will this point to the current element, the first parameter to the callback function for the current element index value, the second parameter for the attributes of the current element
			
			returns[i] = isCallback ? callback[attr_call]($this = this,i,$this[attr]) : callback
			
		})
		
		return returns
		
	};
	
	var attr_style = 'style';
	
	var attr_cssText = 'cssText';
	
	//将字符串首字母转换成大写		
	//First letter uppercase
		
	var ucword = function (str){
			
		str+=empty;
			
		return str[attr_substr](0,1)[attr_toUpperCase]()+str[attr_substr](1)
	};
	
    //获取时间戳函数
    //Get the timestamp function
        
    var getTime = function(){
        	
      	return new Date().getTime()
        	
    };
	
	//设置核心对象fn属性为核心原型属性并初始化属性与方法
	//Set the core object fn attributes as prototype core attributes and initializes the attributes and methods
	
	nick[attr_fn] = nick[attr_prototype] = {
		
		selector : empty,
		
		length : 0,
		
		init:function(selector,context){
			
			if(isFunction(selector)) return nick.ready(selector);
			
			var self = this;
			
			var $this;
			
			var attr_selector = 'selector';
			
			//如果选择器不是字符串
			//If the selector is not string
			
			if(!isString(selector)){
				
				//遍历选择器中的元素，若为html元素则添加到对象中
				//Traverse the selector of the element, if the HTML element is added to the object
				
				each(selector && selector[attr_length] ? selector : [selector],function(){
					
					!isElement($this = this) || self[attr_push]($this)
					
				})
				
			}else{
				
				//如果选择器中包含标签则根据标签创建html对象
				//If the selector contains HTML tags are according to the label created objects
				
				if(/<(\w+).*?>(.*?)(<\/\1>)/[attr_test](selector)){
					
					self.create(selector)
					
				}else{
					
					self[attr_context] = isElement(context) ? context : document[attr_documentElement];
						
					self[attr_selector] = selector;
						
					self[attr_push][attr_apply](self,toArray(self[attr_context][attr_querySelectorAll](selector)))
				}
				
			}
			
			return self
		}
		
	};
	
	//设置fn的初init函数原型为fn对象，而fn对象又等于核心函数的原型。因此设置核心函数原型或者fn都等于为init设置原型属性或方法
	//Set at the beginning of the fn init function prototypes for fn object, and fn object is equal to the core functions of the prototype. Therefore set up a core function prototype or fn is equal to the init setting prototype properties or methods
    nick[attr_fn].init[attr_prototype] = nick[attr_fn];
    
    //为核心函数与fn对象添加扩展方法，以便对当前对象扩展属性或方法
    //As the core function and fn object add extension methods, extended attributes or methods to the current object
    
    nick[attr_extend] = nick[attr_fn][attr_extend] = function(){
    	
    	return extend[attr_apply](window,[this][attr_concat](toArray(arguments)) )
    	
    };
    
	//为fn对象添加数组常用方法，将fn对象作为伪数组
	//Methods add array for fn object, fn object as a pseudo array
	
	each([attr_shift,attr_pop,attr_push,attr_splice,attr_slice,attr_unshift],function(){
			
		nick[attr_fn][this] = Array[attr_prototype][this]
			
	});
    
    //为了提高压缩降低率让变量名保持在1~2个字之间，以及为了更好的维护将各类不同功能模块分装在不同匿名函数中
    //In order to improve the compression to reduce the rate of keeping the variable name between 1 ~ 2 words, and in order to better maintain all kinds of different function module partial shipments in different anonymous functions
    
    
    (function(){
    	//节点查找与操作模块
    	//Node lookup and operation module
    	
    	var attr_All = 'All';

    	var attr_first = 'first';
    	
    	var attr_last = 'last';
    	
    	var attr_prev = 'prev';
    	
    	var attr_next = 'next';
    	
    	var attr_nextAll = attr_next+attr_All;
    	
    	var attr_prevAll = attr_prev+attr_All;
    	
    	var attr_parent = attr_parentNode[attr_substr](0,6);
    	
    	var attr_child = 'child';
    	
    	var attr_after = 'after';
    	
    	var attr_before = 'Before';
    	
    	var attr_append = 'append';
    	
    	var attr_prepend = 'prepend';
    	
    	var attr_insert = 'insert';
    	
    	var attr_innerHtml = 'innerHTML';
    	
    	var attr_insertBefore = attr_insert+attr_before;
    	
    	var attr_before = attr_before[attr_toLowerCase]();
    	
    	var attr_childNodes = attr_child+'Nodes';
    	
    	var attr_children = attr_child+'ren';
    	
    	var attr_element = 'Element';
    	
    	var attr_Sibling = 'Sibling';
    	
    	var attr_child = 'C'+attr_child[attr_substr](1);
    	
    	var attr_elementChild = attr_element+attr_child;
    	
    	var attr_elementSibling = attr_element+attr_Sibling;
    	
    	var attr_firstElementChild = 'first'+attr_elementChild;
    	
    	var attr_lastElementChild = 'last'+attr_elementChild;
    	
    	var attr_nextElementSibling = 'next'+attr_elementSibling;
    	
    	var attr_previousElementSibling = 'previous'+attr_elementSibling;
    	
    	//根据当前对象查找指定关系的节点并返回新的对象，第一个参数为当前对象，第二个参数为筛选的选择器，第三个参数为查找关系
    	//According to the current object lookup specify the relationship between the node and returns a new object, the first parameter to the current object, the second parameter for screening selector, the third argument to search a relationship

    	var find = function(myself,selector,relation,all){
    		
    		var $this;
    		
    		var self;
    		
    		var sibling;
    		
    		var elements;
    		
    		var match = [];
    		
    		bind(myself,function(){
    			
    			$this = this;
    			
    			//如果指定节点关系则根据节点关系获取元素，否则在当前元素中查找元素
    			//If the specified node relationship is based on node elements, or look for the element in the current element
    			
    			elements = relation ? $this[relation] : $this[attr_querySelectorAll](selector);
    			
    			//如果指定节点关系并且最后一个参数为真则启用循环匹配所有符合关系的元素
    			//If the specified node relationship and the last parameter is true, enable cycle all conform to the relationship of the matched elements
    			
    			if(relation && all){
    				
    				//如果节点关系为子级则获取当前元素父级中的子级
    				//If the relationship for the child nodes for current parent of the child element
    				
    				if(relation == attr_children){
    					
    					elements = $this[attr_parentNode][relation]
    					
    				}else{
    					
    					elements = [];
    					
    					//根据节点关系获取元素并且循环获取，将匹配成功的元素添加到元素数组中
    					//According to the relationship between node access elements and circulation, will match the elements added to the elements in the array
    					
    					sibling = $this[relation];
    					
    					while(sibling){
    						
    						//若指定选择器且当前元素拥有选择器匹配方法且通过匹配那么将元素添加到元素数组中，文档节点没有选择器匹配方法所以将不会被添加
    						//If the specified selector and the current element has a selector matching method and by matching the add elements to the elements in the array, a document node no selector matches method so will not be added
    						
    						if(selector ? sibling[attr_matchesSelector] && sibling[attr_matchesSelector](selector) : real)elements[attr_push](sibling);
    						
    						sibling = sibling[relation]
    						
    					}
    					
    				}
    				
    			}
    			
    			//统一所匹配到的元素类型为数组格式进行遍历，如果未匹配到则保存为假，如果匹配到的不是数组格式则保存在数组中
    			//Unified the matched to traverse the element type of an array format, if not match to save is false, if the match to not array format are stored in the array
    			
				each(elements ?  elements[attr_length]!==undefined ? elements : [elements]: fake,function(){
					
					self = this;
					//若指定节点关系则当前元素不能等于自己，若指定选择器则进行选择器匹配，将匹配的元素添加到数组中
					//Relationship if the specified node is the current element can not equal to yourself, if specified selectors selector matching, add of the matched elements to the array
					
					if( $this!=self && (selector ? self[attr_matchesSelector](selector) :real)) match[attr_push](self)
					
				})
    			
    		});
    		
    		return nick(match)
    		
    		
    	};
    	
    	
    	//根据字符串创建标签并返回创建的节点列表，默认不返回文本节点，第二参数若为true则可返回文本节点，第三参数若为true则返回的script节点可以执行
    	//According to the string to create tags and returns to create node list, the default does not return a text node, if the second parameter to true will return a text node, if the third parameter to true is returned can execute the script node
    	var createElement = function(html,getTextNode,runScript){
    		
    		var attr_createElement = 'create'+attr_element;
    		
    		var attr_script = 'script';
    		
    		var attr_src = 'src';
    		
    		var attr_type = 'type';
    		
    		var attr_charset = 'charset';
    		
    		var div = document[attr_createElement]('div');
    		
    		var nodeList = [];
    		
    		var $this;
    		
    		var self;
    		
    		var attr;
    		
    		//创建div节点并将html字符串作为div的内容
    		//Create a div node and the HTML string as the contents of a div
    		
    		div[attr_innerHtml] = html;
    		
    		//默认将div的子级节点元素不包括文本焦点添加到节点列表中，如果第二参数为真则包含文本节点
    		//Will default to the child nodes of the div element does not include text focal point is added to the node list, if the second parameter is true contains text node
    		
    		nodeList[attr_push][attr_apply](nodeList,div[getTextNode ? attr_childNodes : attr_children]);
    		
    		//如果第三参数为真则创建的脚本允许执行，遍历div中的脚本标签通过替换节点实现脚本的可执行
    		//If the third parameter is true, create scripts allow executed, traverse a script div tags by replacing nodes implement executable scripts
    		
    		!runScript || each(nodeList,function(i){
    			
    			self = this;
    			
    			if(self.tagName == attr_script[attr_toUpperCase]()){
    				
    			
	    			//创建一个新的脚本标签并复制以下三个重要的标准属性，如果有其它自定义属性将被忽略不被复制
	    			//Create a new script tags and copy the following three important standard property, if you have other custom attributes will be ignored not being copied
	    			
	    			$this = document[attr_createElement](attr_script);
	    			
	    			each([attr_src,attr_type,attr_charset],function(){
	    				
	    				$this[attr = this] = self[attr]
	    				
	    			});
	    			
	    			//使用新的脚本节点替换当前的脚本节点
	    			//Using the new script node to replace the current script
	    			
	    			//self[attr_parentNode][attr_replace+attr_child]($this,self);
	    			
	    			nodeList[attr_splice](i,1,$this);
    			
    			}
    			
    		})
    		
    		
    		return nodeList
    		
    	}
    	
    	//向选中的元素插入指定节点，第一个参数为选中的元素，第二个参数为被插入的节点元素，第三个参数为插入位置节点关系属性名称，第四个参数为是否执行替换，默认值为假
    	//To insert a specified node selected elements, the first argument for the selected element, the second parameter for node element is inserted, the third parameter is inserted into the position relationship between nodes attribute names, whether the fourth parameter to replace, the default value is false
    	var insertElement = function(myself,elements,relation,replace){
    		
    		var attr_cloneNode = 'cloneNode';
    		
    		var $this;
    		
    		var parent;
    		
    		var newNode;
    		
    		var oldNode;
    		
    		//获取回调函数如果要插入的节点是函数
    		//Access to the callback function if you want to insert nodes is function
    		
    		var callback = isFunction(elements) ? elements : fake;
    		
    		//如果第三参数为真则使用替换节点，但不使用replaceChild方法，在当前节点前插入元素然后再删除当前节点实现“替换节点”
    		//Use the replace node if the third parameter is true, but do not use the replaceChild method, before the current node insertion element and then delete the current node replacement "node"
    		
    		var relation = replace ? attr_before : relation;
    		
    		//强制设置元素列表为数组格式,如果指定回调函数则根据返回值创建数组
    		//Compulsory set list of elements to the array format, if the specified callback function, according to the return value to create the array
    		
    		var elements = callback ? userCallbackReturns(myself,callback,attr_innerHtml) : [elements];
    		
    		//所有节点操作都使用insertBefore方法，不同的插入位置则父级不同，若插入位置为前或后则父级为当前节点的父级否则为当前节点
    		//All nodes use insertBefore method, different location, different parent, if insert position as before or after the parent is the parent of the current node or to the current node
    		
			var parentRelation = relation == attr_after || relation == attr_before || replace? attr_parentNode : fake;
    		
    		//获取旧节点关系，如果是向元素内部头部添加则旧节点为当前元素第一个子节点，如果向当前元素身后添加则旧节点是下一个兄弟节点
    		//Get old node relationship, if it is to add elements inside the head, the old node to the current element to the first child, if the current element to add behind the old node is under a brother
    		
    		var siblingRelation = {};
    		
    		//遍历要插入的元素并生成节点
    		//Traverse to insert elements and generate the nodes
    		
    		each(elements,function(i){
    			
    			//如果是字符串或者数字则根据字符创建新的节点，如果有长度属性则不做处理，如果非假且无长度则以数组格式保存,在节点操作时会进一步判断是否为节点元素
    			//If it is a string or number, according to the character to create a new node, if they have a length property do not do the processing, if not false and no length with array format, in the node operation will determine whether further for the node element
    			
    			newNode = isString(newNode = this) || type(newNode) == 'number' ? createElement(newNode,real) : !newNode ? fake : newNode[attr_length]!==undefined && !callback ? newNode : [newNode];
    			
    			elements[i] = newNode;
    				
    		});
    			
			siblingRelation[attr_prepend] = attr_first+attr_child;
			
			siblingRelation[attr_after] = attr_next+attr_Sibling;
			
			//根据插入位置获取旧节点关系属性
			//According to the insert position for the old relationship property
			
			siblingRelation = siblingRelation[relation];
			
    		//遍历当前元素执行节点插入
    		//Traverse the current element node into execution
    		
    		each(myself,function(i){
    			
    			
    			$this = this;
    			
    			//若指定关系属性则父级为当前节点的关系节点否则为当前节点本身
    			//If specified relationship attribute the parent for the relationship of the current node node or to the current node itself
    			
    			parent = parentRelation ? $this[parentRelation] : $this;
    			
    			//若指定关系则旧节点为当前节点的关系节点，若关系位置为append则旧节点为空否则旧节点为当前节点
    			//If specify the relationship between the old node for the relationship of the current node, if relationship position to append the old node is empty or the old node to the current node
    			
				oldNode = siblingRelation ? $this[siblingRelation] : relation == attr_append ? vacancy : $this;
    			
    			//如果指定回调函数则调用回调函数获取返回值，根据返回值再创建要插入的节点
    			//If you specify a callback function, the callback function to obtain the return value, create to insert nodes according to the return value
    			
				//遍历要插入的节点列表执行节点插入，若指定回调函数则根据当前索引值遍历对应节点，否则遍历数组中第一个
				//Traverse to insert the node list of the execution node insert, if the specified callback function is based on the current index values corresponding node traversal, otherwise, iterate through the first in the group
				
    			each(elements[callback?i:0],function(){
    				
    				//如果新节点可以克隆则克隆新节点，如果不支持克隆则忽略该节点
    				//If the new node can cloning is a new node, if does not support is to ignore the clone node
    				
    				newNode = this;
    				
    				newNode = newNode[attr_cloneNode] ? newNode[attr_cloneNode](real) :fake; 
    				
    				//根据父级执行节点插入操作，并指定新节点与旧节点位置
    				//According to the parent node insert, and specify the new node to the old position
    				
    				if(newNode && parent)parent[attr_insertBefore](newNode,oldNode)
    				
    			})
    			
    		});
    		
    		//节点插入完成后将这些旧节点从文档中删除，如果是执行替换节点则对当前节点也进行删除
    		//Node insert after the completion of the old node is removed from the document, if it is replacing the node to delete the current node also
    		
    		oldNode = [];
    		
    		oldNode[attr_push][attr_apply](oldNode,elements);
    		
    		//如果替换为真则将当前节点添加到旧节点列表中
    		//If replacement is true to the current node is added to the old node list
    		
    		!replace || oldNode[attr_push][attr_apply](oldNode,myself);
    		
    		each(oldNode,function(){
    			
    			$this = this;
    			
    			//将已经添加过的节点从文档中删除
    			//Will have to add a node is removed from the document
    			
    			if($this[attr_parentNode]) $this[attr_parentNode]['remove'+attr_child]($this)
    			
    		})
    		
    		return myself
    		
    	};
    	
    	
    	//遍历节点关系方法，动态为对象扩展这些方法
    	//Traverse the nodes relation method, dynamic extend these methods for the object
    	
    		
    	//为了提高压缩率故不使用json格式使用两个数组进行关联
    	//In order to improve the compression ratio is not using json format using two arrays
    		
    	//定义节点关系方法名与下面的关联列表数组是对应关系
    	//Define node method name to the corresponding relations between the array is the link below
    		
    	var methods = [attr_first,attr_last,attr_next,attr_prev,attr_parent,attr_children,attr_Sibling[attr_toLowerCase]()+'s',attr_nextAll,attr_parent+'s',attr_prevAll,'find'];
    		
    	//定义节点关系列表与上面方法列表对应
    	//Define the node list list corresponding to the above methods
    		
    	var relations = [attr_firstElementChild,attr_lastElementChild,attr_nextElementSibling,attr_previousElementSibling,attr_parentNode,attr_children,attr_children,attr_nextElementSibling,attr_parentNode,attr_previousElementSibling];
    		
    	var method;
    		
    	//遍历节点关系方法列表
    	//Traverse the list node relationship method
    		
    	each(methods,function(i){
    		
    		method = this;
    			
    		//向fn对象属性中扩展节点关系查找方法
    		//Expand to the fn object attribute node relationship lookup method
    			
    		nick[attr_fn][method] = function(selector){
    				
    			//最后一个参数为布尔值仅限最后三个方法使用时为真
    			//The last parameter for Boolean value for the last three methods only when using is true
    				
    			return find(this,selector,relations[i],i>5)
    				
    		}
    			
    	});
    		
    	//定义节点操作方法列表，replaceWith之后的方法需要将内容与被替换的内容进行位置调换
    	//After the operation method of defining node list, replaceWith method need to content is replaced with the content of the transposition
    		
    	methods = [attr_append,attr_prepend,attr_after,attr_before,attr_replace+'With',attr_append+'To',attr_prepend+'To',attr_insertBefore,attr_insert+'A'+attr_after[attr_substr](1),attr_replace+attr_All];
    		
    	each(methods,function(i){
    			
    		var method = this;
    			
    		nick[attr_fn][method] = function(elements){
    				
    			//如果索引值大于4那么后面的方法都需要将要插入的节点与被插入的节点进行位置调换
    			//If the index value is greater than 4 so the latter method needs to be inserted into the node with node is inserted into a position switch
    				
    			var self =  this;
    				
    			var exchange = i > 4;
    				
    			var elements = exchange ? nick(elements) : elements;
    				
    			//将节点关系右侧to与左侧insert清除掉以便获取正确的节点关系属性
    			//Will be rid of node relations to insert to the left on the right side in order to obtain the correct relationship property
    				
    			var relation = ltrim(rtrim(method,'To'),attr_insert)[attr_toLowerCase]();
    				
    			return insertElement(exchange ? elements : self , exchange ? self : elements ,relation , method[attr_indexOf](attr_replace)>-1)
    				
    		}
    			
    	});
    		

    	nick[attr_fn][attr_extend]({
    			
    		//创建节点
    		//Create a node
    			
    		create:function(){
    			
    			return createElement[attr_apply](window,arguments)
    				
    		},
    			
    		//删除节点
    		//Remove nodes
    			
    		remove:function(){
    				
    			var $this;
    				
    			return bind(this,function(){
    					
    				$this = this;
    					
    				$this[attr_parentNode]['remove'+attr_child]($this);
    					
    			})
    				
    		},
    			
    		//克隆节点，若指定参数为真则连同事件等一起克隆
    		//Clone node, if the specified parameter is true, along with events such as cloning
    			
    		clone:function(boolean){
    				
    			var $this;
    				
    			var copy = [];
    				
    			bind(this,function(){
    					
    				$this = this;
    					
    				copy[attr_push]($this.cloneNode(boolean))
    					
    			});
    				
    			return nick(copy)
    				
    		}
    			
    	});
    		
    })();
    	
    (function(){
    		
        //事件绑定与动画模块
        //Event and animation module
        //根据浏览器版本信息判断当前是否为移动端
        //Based on the current browser version information to determine whether for mobile terminal
        
        var isApp = /mobile|android|ihone/i[attr_test](navigator.userAgent);
        
        var attr_addEventListener = 'addEventListener';
        
        var attr_preventDefault = 'preventDefault';
        
        var attr_touch = isApp ? 'touch' :'mouse';
        
        var attr_events = attr_nick+'events';
        
        var attr_changedTouches = 'changedTouches';
        
        var attr_touchTimes = ['time','long'];
        
        var direction = 'up down left right'[attr_split](pattern_space);
        
		var browserCss = browser ? '-'+browser+'-' : browser;
        
		var unitCompletion = function(attr,value){
			
        	//定义常见且不需要单位的属性
        	//Define common and do not need the unit properties
        	
        	var units = {
        		
				'z-index': empty,
				
				opacity: empty,
				
				'line-height':empty
			};
			
			if(/^[-\+\.]?\d+$/[attr_test](value)) value += units[attr] === undefined ? 'px' : units[attr];
			
			return value
			
		};
        
        //将json格式样式转换成css文本，以便使用cssText属性来设置样式且自动补全常用属性单位，常用不兼容的属性将自动添加浏览器前缀
        //Converting the json format style into CSS text, in order to use cssText attribute to set the style and automatic completion common property unit, commonly used is not compatible with the properties of the browser will automatically add prefix
        
        var cssToText = function(style){
        	
			
			//定义常用需要添加前缀的属性列表
			//Define a list of attributes for the common need to add a prefix
			
			var needBrowserUnits = {
				
				transform:real,
				
				transition:real,
				
				animation:real
				
			};
			
			var css = isObject(style) ? style : {};
			
			var cssText = empty;
			
			var attr;
			
			var value;
			
			if(!isObject(style)) return needBrowserUnits[style] ? browserCss+ltrim(style,browserCss) :style+empty;
			
			//获取css属性可被枚举的属性列表且进行排序以保证属性设置的顺序统一
			//To obtain a list of CSS properties can be enumerated attribute and sorted to ensure uniform attribute set order
			
			each(Object.keys(css)[attr_sort](),function(){
				
				
				attr = this;
				
				value = css[attr];
				
				//将样式属性名强制转换成-连接起来的字符串格式不使用骆峰法，若当前属性在需要添加前缀的列表中则自动向属性添加浏览器前缀
				//Connect style attribute name cast - string format does not use LuoFeng method, if the current attributes in the list which is need to add a prefix automatically to add browser prefix attribute
				
				attr = (needBrowserUnits[attr] ? browserCss+ltrim(attr,browserCss) :attr+empty)[attr_replace](/[A-Z]/g, function(a) {
	
					return '-' + a[attr_toLowerCase]()
	
				});
				
				//如果属性值以数字结尾则进行单位补全，若当前属性在单位列表中则不补全单位 
				//If the attribute value in digital end to completion, the unit if the attributes in the unit in the list is not completion
				
				if(value!==undefined)cssText+=attr+':'+unitCompletion(attr,value)+';';
				
			})
			
        	return cssText
        };
        
        //设置或获取指定样式，仅设置属性则返回对应样式，同时设置属性与值则设置样式，多条样式可设置第一参数为json格式
        //To set or get named style, set properties only returns the corresponding style, set properties and values set style at the same time, many styles can set the first parameter to the json format
        
        var css = function(myself,attr,value){
        	
        	var $this = myself[0];
        	
        	var css = isObject(attr) ? attr : {};
        	
        	//若第一参数为字符串且未指定第二参数将返回第一个被选中元素的样式
        	//If the first parameter is a string and returns the first do not specify a second parameter is selected elements of style
        	
        	if(isString(attr) && value === undefined && $this)return window[attr_getComputedStyle]($this)[attr];
        	
        	if(!isObject(attr)) css[attr] = value;
        	
        	css = cssToText(css);
        	
        	return bind(myself,function(){
        		
        		//通过cssText设置样式,重复设置将进行样式覆盖，错误的样式将被忽略
        		//Through cssText styled, repeat Settings will be style cover, the style of the errors will be ignored
        		
        		this[attr_style][attr_cssText] += css;
        		
        	})
        	
        };	
        
        
        //设置触摸生效时间，第一个参数为单击触摸时间，第二个为长按时间，若时间值为假则使用默认时间。每个元素的事件时间只有一个，重复设置将影响之前的事件响应时间！
        //Touch the effective time, the first parameter to click the touch time, as long as the second time, if time use the default value is false. Each element of the event time is only one, repeat Settings will influence before the incident response time!
        
        var setTouchTime = function(touchTime,touchLongTime){
        	
        	var $this;
        	
        	//设置触摸时间与长按时间的属性名称
        	//Set touch with long time attribute names
        	
        	var attr_touchTime = attr_events+attr_touchTimes[0];
        	
        	var attr_touchLongTime = attr_events+attr_touchTimes[1]+attr_touchTimes[0];
        	
        	var touchTime = toNumber(touchTime);
        	
        	var touchLongTime = toNumber(touchLongTime);
        	
        	return bind(this,function(){
        		
        		$this = this;
        		
        		//若设置时间则使用新设置的时间否则使用文档元素之前的时间，若未设置有效时间则使用默认时间
        		//If set a time with a new set of time or before using the document element, if not set effective time is using the default time
        		
        		$this[attr_touchTime] = touchTime || $this[attr_touchTime];
        		
        		$this[attr_touchLongTime] = touchLongTime || $this[attr_touchLongTime];
        		
        	})
        	
        };
        
        
        //触发事件时统一通过该函数执行，第一参数为元素，第二参数为事件类型，第三参数为事件对象,第四参数为对象的普通事件与委托事件数组
        //Is unified by the function when a trigger event, the first parameter for the element, the second parameter for the event type, the third argument for the event object, the fourth parameter for ordinary events and entrust an array of objects
        
        var eventsCallback = function($this,type,event,allEvents){
       
	        var self;
	       
	        //所有要执行的事件都保存在事件该变量中
	        //All events are to be stored in the event that variable
	        
	        var events = {};
	        
	        //获取事件对象，若支持触摸点则获取第一个触摸点
	        //Access the event object, if the support touch point is to get the first touch point
	        
	        var e = event[attr_changedTouches] ? event[attr_changedTouches][0] : event;
    				
    		//根据事件对象获取目标元素
    		//According to the event object for the target element
    				
    		var target = e.target;
    				
    		//获取当前元素父级
    		//Gets the current parent element
    				
    		var parent = $this[attr_parentNode];
    		
    				
    		//循环向上查找元素，如果未找到元素或者找到的元素等于父级则终止查找
    		//Cycle up look for the element, if the element is not found or find elements is equal to the parent is terminated lookup
    				
    		do{
    					
    			//遍历当前元素的普通事件列表以及委托的事件列表,处理之后得到统一的对象便于遍历执行回调函数
    			//Traversal of the current element ordinary events list as well as entrusted by the list, after processing be implemented unified object is easy to iterate through the callback function
    					
    			each(allEvents,function(){
							
					/**
					 * 事件列表的格式如下，选择器为对象的属性名，其值数组格式保存对应的回调函数
					 * The format of the event list as follows, the selector for the object property names, the value of the array format callback function
					 * {
					 *    selector:[fn1,fn2,fn3...]	
					 * 
					 * }
					 */
							
					//遍历事件列表，对元素进行匹配处理得到统一的格式保存到events变量中
					//Traverse the event list, to match the elements to get a unified format to events variable
							
					each(this,function(selector){
								
						//以选择器为属性名，值为数组格式，数组中第一个值为匹配的元素，第二个值为要执行的回调函数且是数组格式
						//Selector for the property name and value of array format, the first value for matching element in the array, the second value to implement the callback function and array format
								
						events[selector] = events[selector] || [selector ? target : $this ];
								
						//元素匹配成功则设置数组的第二个元素为当前函数数组
						//Element matching success, the second element of an array of Settings for the current function array
								
						if(selector ?  target[attr_matchesSelector](selector) : target == $this || isWindow($this))events[selector][1] = this;
								
					})
							
    			})
    					
				target = target[attr_parentNode];
    					
    		}while(target && target!=parent)
    				
    		//遍历处理后的事件列表
    		//List traversal process after the event
    				
   			each(events,function(){
    					
   				//当前对象为数组，第一个值为文档元素，第二个值为函数数组
   				//The current object as an array, the first value of the document element, the second value for function array
    					
   				self = this;
    					
   				//遍历当前对象的函数数组若无值则忽略不执行遍历
   				//Traverse the object function of the array without value, ignoring executed traversal
    					
   				each(self[1],function(){
    						
   					//执行回调函数并将this指向匹配的文档元素，将事件对象传递给回调函数，若回调函数返回值全等于假则取消默认行为
   					//Implement the callback function and will this point to match the document element, the event object is passed to the callback function, if the callback function return value is equal to false to cancel the default behavior
    						
   					this[attr_call](self[0],event) !== fake || event[attr_preventDefault]();
    						
   				})
    					
   			})
    				
   		};
    		
   		//绑定手势事件函数
   		//Binding gesture event functions
    			
   		var gestureEvent = function($this,attr_subline){
   			
   			//如果是移动端则使用鼠标事件否则使用触摸事件，根据设备类型设置不同的事件
   			//If it is a mobile terminal, use the mouse or use touch events, set different depending on the type of equipment
    		
    		var attr_start = isApp ?'start':'down';
    		
    		var attr_end =isApp?'end':'up';
    		
    		var attr_move = 'move';
    		
    		//相关的事件信息都以保存在文档元素的属性上，这些属性名尽可能避免与用户自定义属性名冲突
    		//Related event information to save on document elements on the properties of these properties of as much as possible to avoid conflict with user-defined attribute name
    		
    		var attr_events_info = attr_events+attr_subline+attr_touch;
    		
    		//设置事件开始时间、开始水平坐标、开始垂直坐标、单击（触摸）时间、长按时间等属性名称用于保存这些事件信息
    		//Set up the event start time, began to horizontal coordinates, vertical coordinate, click (touch), long time used to hold the event information such as attribute names
    		
    		var attr_startTime = attr_events+attr_start+'time';
    		
    		var attr_startX = attr_events_info+attr_start+'X';
    		
    		var attr_startY = attr_events_info+attr_start+'Y';
    		
        	var attr_touchTime = attr_events+attr_touchTimes[0];
        	
        	var attr_touchLongTime = attr_events+attr_touchTimes[1]+attr_touchTimes[0];
    		
    		var attr_clientX = 'clientX';
    		
    		var attr_clientY = 'clientY';
    		
    		var attr_slip = 'slip';
    		
    		var moveX;
    		
    		var moveY;
    		
    		var touchTime;
    		
    		var touchLongTime;
    		
    		var useTime;
    		
    		var toggle;
    		
    		var movingRange = 30;
    		
    		var e;
    		
    		var type;
    		
    		var abs = Math.abs;
    		
    		
    		//绑定触摸或鼠标按下事件
    		//Binding to touch or mouse press event
    		
    		$this[attr_addEventListener](attr_touch+attr_start,function(event){
    			
    			//在非移动设置下点击拖动导致文本被选中或打开新窗口等因此阻止默认行为，如果对表单链接等有默认行为的元素添加此事件将导致表单无法选中或者点击链接不生效
    			//In the mobile Settings click-and-drag led to the selected text or open a new window, so stop the default behavior, if the forms have the default behavior of the element such as links to add this event will lead to form cannot be selected or click on the link does not take effect
    			
    			event[attr_preventDefault]();
    			
    			toggle = real;
    			
    			e = event[attr_changedTouches] ? event[attr_changedTouches][0] : event;
    			
    			//根据事件对象保存事件开始时的信息
    			//According to the information at the start of the event object to save
    			
    			$this[attr_startX] = e[attr_clientX];
    			
    			$this[attr_startY] = e[attr_clientY];
    			
    			$this[attr_startTime] = getTime();
    			
    			
    		});
    		
    		//绑定移动事件
    		//Binding mobile event
    		
    		$this[attr_addEventListener](attr_touch+attr_move,function(event){
    			
    			//如果拖动开关为假则不执行，拖动开关在开始时打开结束或者取消时关闭，执行滑动事件
    			//Switch is false, not executed if drag, drag the switch at the beginning open end or cancel closed, perform sliding event
    			
    			if(toggle) eventsCallback($this,attr_slip,event,[$this[attr_events][attr_slip],$this[attr_events][attr_slip+attr_subline]])
    		
    		});
    		
    		//绑定取消事件
    		//Binding cancellation event
    		
    		$this[attr_addEventListener](attr_touch+(isApp?'cancel':'leave'),function(){
    			
    			//当触摸意外取消或者鼠标离开元素将拖动开关关闭
    			//When touch unexpectedly cancelled or mouse left element will drag switch off
    			
    			toggle = fake
    			
    		});
    		
    		
    		//绑定结束事件
    		//End of the binding event
    		
    		$this[attr_addEventListener](attr_touch+attr_end,function(event){
    			
    			
    			toggle = fake;
    			
    			type = empty;
    			
    			e = event[attr_changedTouches] ? event[attr_changedTouches][0] : event;
    			
    			//获取事件结束时的事件信息减掉开始时的信息得到移动的距离以及事件所使用的时间，并获取单击与长按所限制的时间
    			//Get event at the end of the event information to lose at the beginning of the information is used by moving distance and event time, and get the click with long, in accordance with the limit of time
    			
    			moveX = e[attr_clientX] - $this[attr_startX];
    			
    			moveY = e[attr_clientY] - $this[attr_startY];
    			
    			useTime = getTime() - $this[attr_startTime];
    			
    			touchTime = $this[attr_touchTime] || 100;
    			
    			touchLongTime = $this[attr_touchLongTime] || 200;
    			
    			//如果水平与移动移动距离都为假则表示没有移动，根据所用时间是否使用单击或长按事件
    			//If level and said no mobile mobile mobile distance are all false, depending on the time whether to use long click or press event
    			
    			if(!moveX && !moveY){
    				
    				type = useTime>touchTime && useTime<touchLongTime ? 'click' : useTime>touchTime ?'longclick' : empty;
    				
    			}
    			
    			//如果垂直移动距离小于移动范围则将触发水平移动事件，若水平移动为负表示向左反之向右
    			//If vertical movement distance is less than the range will trigger level movement, if the horizontal displacement is negative said instead to the right to the left
    			
    			if(abs(moveY) < movingRange){
    				
    				type = attr_slip + direction[moveX>0?3:2];
    				
    			}
    			
    			//如果水平移动距离小于移动范围则将触发垂直移动事件，若垂直移动为负表示向上反之向下
    			//If move horizontally moving distance is less than the range of vertical motion event will be triggered, if the up and down vertical movement is negative
    			
    			if(abs(moveX) < movingRange){
    				
    				type = attr_slip + direction[moveY>0?1:0];
    			}
    			
    			//若匹配到手势类型则执行回调函数
    			//If matched to the gesture type execute callback function
    			
    			if(type) eventsCallback($this,type,event,[$this[attr_events][type],$this[attr_events][type+attr_subline]]);
    			
    		});

   		};


   		//为指定元素绑定事件，第一参数为要绑定事件的元素，第二参数事件类型，若事件类型以下划线开头表示启用事件委托支持对未来元素绑定事件，第三个参数为回调函数，第四个参数为选择器
   		//Binding events for a given element, the first parameter to the binding element of events, event type, the second parameter if the event type underscore the beginning said enable entrust support element binding for the future events, the third parameter is the callback function, the fourth parameter for the selector
    		
   		var addEventListener = function(myself,type,callback,selector){
    			
   			var attr_subline = '_';
    			
   			//获取事件类型前缀下划线用于区分是否使用事件委托
   			//Access the event type prefix the underline to distinguish whether or not to use event delegation
    			
   			var attr_onEventsPrefix = (type+empty)[attr_indexOf](attr_subline) > -1 ?attr_subline : empty;
    			
   			//清除事件类型前缀并以空格进行拆分，支持同时绑定多个事件
   			//Remove event type prefix and take apart in space, support binding to multiple events at the same time
    			
   			var type = ltrim(type,attr_onEventsPrefix)[attr_split](pattern_space);
    			
   			//当启用事件委托时可以指定选择器进行匹配，若不指定默认为空
   			//When you enable event delegation can be specified when the selector matches, if do not specify a default empty
    			
   			var selector = selector || empty;
    			
   			var self;
    			
   			var $this;
   			
   			var events;
   			
   			return bind(myself,function(){
    				
   				$this = this;
    				
   				//遍历事件类型列表
   				//Traverse the list of event types
    			
   				each(type,function(){
    					
   					//获取事件类型并添加后缀
   					//Access the event type and add the suffix
    					
   					self = this+attr_onEventsPrefix;
    					
   					//若当前元素没有事件对象属性则设置默认值并且执行手势绑定函数，手势绑定函数只执行一次
   					//If the current element does not event object attribute to set the default values and perform gestures binding function, gestures binding function executed only once
    					
   					if(!$this[attr_events] && !gestureEvent($this,attr_subline)) $this[attr_events] = {};
    					
   					//若事件对象中当前事件类型不存在则设置默认值
   					//If the event object in the current event type does not exist is to set the default values
    					
   					if(!$this[attr_events][self]) $this[attr_events][self] = {};
    					
   					//获取当前元素的事件列表
   					//To obtain a list of the current element events
    					
   					events = $this[attr_events][self];
    					
   					//事件列表对象以选择器为属性名保存函数数组，如果事件列表中不存在选择器属性则设置默认值
   					//Event list object selector for the property name save function array, list if the event does not exist selector is to set the default attribute values
    					
   					if(!events[selector])events[selector] = [];
    					
   					//根据选择器获取事件函数
   					//According to the function selector for events
    					
   					events = events[selector];
    					
   					//如果回调函数不在事件函数数组中则将回调函数添加到数组中
   					//If the callback function is not event functions in the array will callback function is added to the array
    					
   					inArray(callback,events) || events[attr_push](callback);
    					
   					//清除事件类型中的后缀,无论是否委托其实都只绑定了一次事件
   					//Remove the suffix event type, regardless of whether the entrusted are binding only event at a time
    					
   					self = rtrim(self,attr_onEventsPrefix);
    					
   					//如果当前元素未绑定此此事件类型则绑定事件
   					//If the current element binding the this event type is not binding
    					
   					if(!$this[attr_events][attr_nick+self]){
    						
   						//设置元素的属性名为真用于判断是否绑定过某种事件
   						//Set the attribute of the element, is used to determine whether the binding through some kind of event
    						
   						$this[attr_events][attr_nick+self] = real;
   						
   						//为元素绑定事件并通过eventsCallback统一执行，在该函数中会自动处理普通事件与委托事件
   						//And through eventsCallback unified implementation for element binding event, in this function automatically ordinary events and commissioned processing
    						
   						$this[attr_addEventListener](self,function(e){
    							
   							eventsCallback($this,type = e.type,e,[$this[attr_events][type],$this[attr_events][type+attr_subline]])
    							
   						})
    						
   					}
    					
   				})
    				
   			})    			
    			
   		};
   		
   		//移动事件绑定，第一个参数为事件类型，第二个参数为回调函数，第三个参数为布尔值若为真则表示移除事件委托
   		//Mobile event, the first argument for the event type, the second parameter to the callback function, the third argument for Boolean if true then said remove event delegation
   		
   		var removeEventListener = function(myself,type,callback,selector){
   			
			var $this;
			
			var events;
			
			var self;
			
			var events;
			
			var newEvents = [];
			
			//将事件以空格拆分为数组格式
			//The events in space into an array format
			
			var type = (type+empty)[attr_split](pattern_space);
			
			var attr_onEventsPrefix = selector ?'_':empty;
			
			var selector = selector || empty;
			
			//若未指定正确的回调函数则直接返回对象本身否则遍历对象进行事件移除
			//If not specified the correct callback function then returns the object itself directly or through the object to remove events
			
			return !isFunction(callback) ? myself : bind(myself,function(){
				
				$this = this;
				
				//若当前元素没有事件对象属性则终止处理
				//If the current element does not event object attribute to terminate treatment
				
				if(!$this[attr_events])return;
				
				each(type,function(){
					
					self = this + attr_onEventsPrefix ;
					
					//获取当前元素的所有事件仅限当前指定的事件类型
					//Access to the current element of all events for the specified event type only
					
					events = $this[attr_events][self];
					
					//遍历当前事件
					//Traverse the current event
					
					each(events,function(i){
						
						//若指定的选择器等于当前事件中的选择器则遍历事件中的函数数组
						//If the specified selector is equal to the current event selector in the events will traverse the functions in the array
						
						selector !== i || each(this,function(){
							
							if((this+empty) != (callback+empty)) newEvents[attr_push](this)
							
						})
						
					})
					
				})
				
				//覆盖原有的事件完成事件移除
				//Cover the original complete events removed
				
				$this[attr_events][type+attr_onEventsPrefix][selector] = newEvents;
				
			})
   			
   		};
   		
		
		
		(function(){
			
			var attr_animation = 'animation';
			
        	var attr_keyframe = 'keyframe';
        	
        	var attr_opacity = 'opacity';
        	
	   		var attr_display = 'display';

			//保存动画队列的属性名称将作为文档元素的属性名
			//Save the animation queue attribute name will serve as the document element attribute names
			
			var attr_animationQueue = attr_nick+attr_animation;
			
			//保存是否有动画在执行的属性将作为文档的属性名
			//Save will have the properties of animation in the execution as the properties of the document name
			
			var attr_animationRuing = attr_animationQueue+real;
			
			//保存动画回调函数的属性
			//Save the animation of the callback function properties
			
			var attr_animationCallback = attr_animation+attr_call;
			
			//保存最后一次已经执行过的动画名称，以便在动画完成之后读取动画规则并更新样式保存动画完成之后的状态
			//Save the last time has been carried out animation name, so that after the completion of a animation read rules of animation and update style animation completed state
			
			var attr_lastAnimationName = attr_animation+attr_apply;
			
			//自定义动画在完成时应该清除显示模式以外的属性因此该属性名用于标识是否在执行公共动画
			//Custom animation when finished should be off the display mode and the attribute name used to identify whether in executing public animation
			
			var attr_commonAnimationRuing = attr_animationRuing+vacancy;
			
			
			//创建样式列表用于向样式表中添加动画规则
	   		//Create the style list for adding animation to the stylesheet rules
	   		
	   		var styleSheet = (function(){
				
				if(!styleSheet){
					
					//创建样式标签
					//Create a style tags
					
					var style = document.createElement('style');
					
					document[attr_documentElement]['appendChild'](style);
					
					//获取样式表
					//To obtain a stylesheet
					
					styleSheet = style.sheet;
					
					//对样式表添加自定义属性用于缓存动画规则
					//The style sheet to add custom attributes used to cache rules of animation
					
					styleSheet[attr_nick+attr_animation] = {};
					
					return styleSheet
					
				}
				
			})();
			
			//根据动画名称获取动画规则，当动画完成之后将动画规则100%的样式设置为css样式以保证动画结束也依然能保持样式
			//According to the rules of animation name for animation, when the animation completes set the style of the animation rules 100% to CSS styles to ensure the end of the animation is still can keep the style
			
			var getAnimationRules = function(animationName,$this){
				
				//遍历样式表中的动画规则，如果规则中的动画名等于当前则匹配出100%位置的样式，只有100%时的样式会在动画完成后暂时保留
				//Traverse the animation in the style sheet rules, if the rules of animation name is equal to the current 100% matching position style, only 100% when the style of the tentative retention after completion of the animation
				
				return each(styleSheet[attr_nick+attr_animation],function(i){
					
					//如果没匹配到100%位置的样式则返回空字符
					//If no match to the style of the position it returns null character 100%
					
					if(this == animationName) return i[attr_replace](/.*?100%\{(.*?)\}/,'$1')
						
					
				}) || empty
				
			};
			
			
	   		
			//创建CSS3动画，第一参数为动画名称，第二参数为动画样式，若不指定动画名将自动生成随机动画名称，且相同动画样式会进行缓存不重复创建
			//Create CSS 3 animation, name of the first parameter for the animation, the second parameter for animation style, if not specified animation will automatically generate random name of animation, and caching don't repeat the same animation style creation
			
			var createAnimation = function(animationName,css){
				
				//定义保存动画规则的属性名称
				//In the name of the attribute definition save animation rules
				
				var attr_animationRules = attr_nick+attr_animation;
				
				//保存动画规则
				//Save the rules of animation
				
				var rules = empty;
				
				//若指定动画名称则使用指定的动画名称否则使用  动画规则属性名加时间戳为名称加随机数，同时绑定多个动画时时间戳有可能重复
				//If you specify the name of the animation, using the specified animation name or use Rules of animation attribute name plus a timestamp for a name and a random number, at the same time bound timestamp when multiple animations are likely to repeat it
				
				var	animationName = animationName || attr_animationRules+'_'+getTime()+parseInt(Math.random()*99);
				
				//从样式表中读取缓存的动画规则
				//Read cache from the stylesheet rules of animation
				
				var animationRules = styleSheet[attr_animationRules];
				
				
				/**
				 * 遍历动画样式并生成动画规则，动画样式格式示例：
				 * Traverse the animation style rules, and generate animation animation style format sample:
				 *  {
				 *    0:{
				 * 	     width:200px;
				 *    },
				 *    100:{
				 * 	    width:230px;
				 *    }
				 * 
				 * }
				 * 
				 * 数值表示动画的时间位置，可以添加若干份，而每个时间对应的样式为json格式与css样式格式相同
				 * Numeric representation of the animation time position, can add a number of copies, and each time the style of the corresponding to the json format same as the CSS style format
				 * 
				 */
				
				each(css,function(i){
					
					//i为当前动画位置自动添加百分比单位，并将当前样式转换成字符串
					//Position automatically add percentage for the current animation unit, and transform the current style into a string
					
					rules+=i+'%{'+cssToText(this)+'}';
					
				});
				
				//若动画规则列表中不存在当前的动画规则
				//If the list does not exist the current animation animation rules rules
				
				if(!animationRules[rules]){
					
					//将动画存入缓存，属性名为动画规则，值为动画名称，以便快速查找是否缓存过动画
					//The animation in the cache, attribute called animation rules, the value of the animation name, will quickly find the cache for animation
					
					animationRules[rules] = animationName;
					
					//将动画规则添加到样式表中并自动添加浏览器前缀
					//Add animation rules to the style sheet and automatically add browser prefix
					
					try{
						
						styleSheet.insertRule('@'+browserCss+attr_keyframe+'s '+animationName+'{'+rules+'}',0);
					
					}catch(e){
						
						//ie9浏览器不支持keyframes
					
					}
					
					//返回动画名称
					//Returns the name of animation
					
					return animationName
					
				}else{
					
					//已缓存动画根据动画规则返回动画名
					//Cached animation according to the rules of animation return animation
					
					return animationRules[rules]
				}
				
			};

			
			
			//检测当前动画规则是否有效，如果动画规则中有样式与当前样式不一致则返回真，否则返回假或未定义，如果动画规则无效则不会触发动画事件导致队列中断因此需要进行判断强制执行队列
			//Detect the validity of the current animation rules, if you have any style animation rules do not agree with the current style, return true, otherwise returns false or undefined rule is invalid if the animation will not trigger the animation events led to the suspension of the queue will need to be judgment enforcement queue
			
			var checkAnimationRules = function($this,options,current){
				
				//配置中的0是配置动画时的样式规则，遍历该样式规则与当前元素的样式进行比较
				//Configuration of 0 is to configure the style rules in effect at the time of the animation, traverse the style rules comparing with the style of the current element
				
				return each(options[0],function(){
					
					return each(this,function(i){
						
						//如果当前元素的样式与动画规则样式不同立即返回真且终止循环
						//If the style of the current element and rules of animation style different immediately return true and terminate the loop
						
						if(window[attr_getComputedStyle]($this)[i] !=unitCompletion(i,this) )return real
						
					});
					
					
				})
				
			};
			
			//解析生成动画参数
			//Parsing generated animation parameters
			
			var parseAnimationOptions = function(style,options){
				
				//如果第一参数为数值则表示设置动画时间，其它参数使用默认值
				//If the first parameter for the numerical said set animation time, other parameters using the default values
				
				var time = toNumber(options) || 0.7;
				
				var options = options || {};
				
				var value;
				
				var animationOptions = empty;
				
				//创建动画规则并获取返回的动画名称，若指定动画名称且存在可直接调用或不存在将创建随机动画名
				//Create animation rules and obtain the return animation name, if the specified animation name and can be called directly or does not exist to create random animations
				
				var animationName = createAnimation(options[attr_keyframe],style);
				
				//创建动画参数配置副本以便在执行时用于检测动画规则是否有效
				//Copy to create animation parameters configuration so that when executed for detecting animation rule is valid
				
				var copyOptions = {};
				
				//将动画样式规则保存至副本
				//To save the animation style rules to copy
				
				copyOptions[0] = style;
				
				
				//若第一参数为可遍历的json或其它格式则遍历以下配置，若传递的参数有这些属性则使用否则使用默认值
				//If the first parameter to traverse the json or other format traverse the following configuration, if the parameters passed with these properties is used or use the default values
				
				each({keyframe:animationName,time:time,ease:'ease',delay:0,count:1,direction:'normal',fill:'both'},function(i){
				
					value =  options[i] ===undefined ? this : options[i];
					
					//如果是时间属性则强制转换成数字并添加秒单位
					//If it is a time property is forced into digital and add a second unit
					
					if(/time|delay/[attr_test](i)) value = toNumber(value)+'s';
					
					//将样式属性保存至副本样式
					//To save style attributes to copy the style
					
					copyOptions[i] = value;
					
					animationOptions+=' '+value;
				
				});	
				
				//将处理后的动画参数与副本参数返回
				//After processing of animation parameters with a copy of the return
				
				return [animationOptions,copyOptions]
				
			};
			
	   		//动画开始监听事件，更新动画运行状态
	   		//Animation to start listening to events, update the running state of the animation
	   		
	   		var animationStart = function(){
	   			
	   			this[attr_animationRuing] = real;
	   			
	   		};
	   		
	   		
	   		//开启动画队列，每次删除并执行队列中第一组动画
	   		//Open animation queue, delete the first group of animation and execute the queue at a time
	   		
	   		var startAnimationQueue = function($this){
	   			
	   			var $this = $this || this;
	   			
	   			//获取动画队列
	   			//Get the animation queue
	   			
	   			var queue = $this[attr_animationQueue];
	   			
	   			//删除并获取第一个队列
	   			//Delete and obtain the first queue
	   			
	   			var options = queue[attr_shift]();
	   			
	   			//读取副本配置
	   			//Read a copy of the configuration
	   			
	   			var coptyOptions = options ? options[2] : fake;
	   			
	   			//保存强制执行队列时所需要的延迟时间
	   			//Need to preserve the compulsory execution queue delay time
	   			
	   			var time;
	   			
	   			//若队列存在则执行动画样式并更新当前队列要执行的回调函数
	   			//If the queue is implement animation style and update the current queue to implement the callback function
	   			
	   			if(options){
	   				
	   				//若队列中的第一个参数为回调函数则options信息通过回调函数生成，通过parseAnimationOptions生成配置信息，并需要在数组索引为1的位置设置为回调函数
	   				//If the first parameter to the callback function in the queue is the options through the callback function to generate information, generated by parseAnimationOptions configuration information, and need to be in the location of the array index of 1 is set to the callback function
	   				
	   				if(isFunction(options[0])){
	   					
	   					//执行回调函数并生成options信息
	   					//Implement the callback function and generate options information
	   					
	   					options = options[0][attr_apply]($this,options[1]);
	   					
	   					//获取副本配置
	   					//Obtain a copy of the configuration
	   					
	   					coptyOptions = options[2];
	   					
	   				}
	   				
	   				//根据配置副本检测当前动画规则是否有效以及判断当前要执行的动画名称是否等于上次的动画名称，若规则无效或动画相同则强制执行队列
	   				//According to a copy of the configuration to test whether the current animation rules effectively and judge whether the current name to perform the animation is equal to the last name of the animation, if a rule is invalid or animation is same enforcement queue
	   				
		   			if(!checkAnimationRules($this,coptyOptions) || coptyOptions[attr_keyframe] == $this[attr_lastAnimationName]){
		   				
		   				//计算当前队列所需要花费的时间，即便动画无效也依然按时间执行回调函数，时间为动画次数乘以动画时间加延时，计算的时间再乘以一千
		   				//Calculate the amount of time required for the current queue, even if the animation is still invalid time in accordance with the callback function, as animated animation number multiplied by time and delay time, computing time and then multiplied by one thousand
		   				
		   				time = (coptyOptions.count*toNumber(coptyOptions.time)+toNumber(options.delay))*1000;
		   				
		   				//定时强制执行队列
		   				//Timing enforcement queue
		   				
		   				setTimeout(function(){
		   					
		   					//执行回调函数并更新运行状态
		   					//Implement the callback function and update the running state
		   					
		   					$this[attr_animationRuing] = fake;
		   					
		   					if(options[1])options[1][attr_call]($this);
		   					
		   					//再次开启队列
		   					//Open the queue again
		   					
		   					startAnimationQueue[attr_call]($this)
		   					
		   				},time);
		   				
		   				
		   			}else{
		   				
		   				//动画规则有效直接执行样式
		   				//Animation rules effective direct execution style
		   				
	   					css([$this],attr_animation,options[0]);
	   							   			//更新动画回调函数
			   			//Update the animation callback function
			   				
			   			$this[attr_animationCallback] = options[1];
		   				
		   			}
		   			
		   			//更新动画名称以便下次执行动画判断是否重复执行动画
		   			//Update the name of the animation so that the next execution animation judge whether to repeat the animation
		   			
		   			$this[attr_lastAnimationName] = coptyOptions[attr_keyframe];
		   			
	   			}
	   			
	   		};
	   		
	   		
	   		//动画完成时执行的回调函数
	   		//Animation is complete execution of the callback function
	   		
	   		var completeAnimationQueue = function($this,attr,animationRules){
	   			
	   			
	   			$this = this;
	   			
	   			//更新动画运行状态
	   			//Update the running state of the animation
	   			
	   			$this[attr_animationRuing] = fake;
	   			
	   			//读取当前动画名称最后一个状态的样式，将该样式设置为css样式以保持动画完成之后的状态
	   			//Read the current state of the animation name last style, set the style for the CSS style to keep animation completed state
	   			
	   			animationRules = getAnimationRules($this[attr_lastAnimationName]);
	   			
	   			//保存当前动画状态
	   			//Save the current animation state
	   			
	   			$this[attr_style][attr_cssText]+=animationRules;
	   			
	   			
	   			//如果当前动画是公共动画则设置动画中的样式除显示模式外为空
	   			//If the current animation is the animation is set in the animation style in addition to the display mode is empty
	   			
	   			if($this[attr_commonAnimationRuing]){
	   				
	   				
	   				//如果动画样式规则中并没有显示模式则不需要清除样式，否则遍历清除动画中设置的样式。fadeTo并不指定显示模式且要保留样式所以不做处理
	   				//If did not show in the animation style rules mode does not clear the style, or the animation set in the traversal removed style. FadeTo doesn't specify the display mode and keep the style so don't do processing
	   				
	   				each(animationRules[attr_indexOf](attr_display)>-1?animationRules[attr_split](';'):fake,function(){
	   					
	   					//将css样式拆分获取属性名
	   					//The CSS style split for attribute names
	   					
	   					attr = this[attr_split](':')[0];
	   					
	   					//若css样式属性名不是显示模式则设置为null清除掉
	   					//If the CSS style attribute names are not clear display mode is set to null
	   					
	   					if(attr!=attr_display)$this[attr_style][attr] = vacancy;
	   					
	   				})
	   				
	   				//操作完成更新公共动画运行状态
	   				//Operation to complete the update public animation running state
	   				
	   				$this[attr_commonAnimationRuing] = fake;
	   			}
	   			
	   			//若动画回调函数存在则执行回调函数
	   			//If animation exist the callback function is executed callback function
	   			
	   			!isFunction($this[attr_animationCallback]) || $this[attr_animationCallback][attr_call]($this);
	   			
	   			//将执行过的回调函数清除
	   			//
	   			$this[attr_animationCallback] = fake;
	   			
	   			
	   			//开启一个队列
	   			//Open a queue
	   			
	   			startAnimationQueue[attr_call]($this);
	   			
	   		};
	   		
	   		//清除动画队列
	   		//Remove the animation queue
	   		
	   		var clearAnimationQueue = function(myself){
	   			
	   			var $this;
	   			
	   			return bind(myself,function(){
	   				
	   				$this = this;
	   				
	   				//若当元素有动画队列属性则设置动画队列、动画运行状态为初始值，并设置动画样式为空
	   				//If when the element has animation queue queue attribute is set animation, animation running state as the initial value, and set the animation style is empty
	   				
	   				if($this[attr_animationQueue]){
	   					
	   					$this[attr_animationQueue] = [];
	   					
	   					$this[attr_animationRuing] = fake;
	   					
	   					css([$this],attr_animation,undefined+empty);
	   					
	   				}
	   				
	   			})
	   			
	   		};
	   		
	   		//添加CSS3动画，第二参数为动画样式，第三参数为动画时间或json格式的配置，第四参数为回调函数
	   		//Add CSS 3 animation, the second parameter for animation style, the third parameter for animation time or json format of configuration, the fourth parameter to the callback function
	   		
	   		var animation = function(myself,style,time,callback){
	   			
	   			var attr_animationEvent = browser+ucword(attr_animation);
	   			
	   			var attr_animationStart = attr_animationEvent+'Start';
	   			
	   			var attr_animationEnd = attr_animationEvent+'End';
	   			
	   			//如果动画样式为函数那么动画规则样式将在队列完成之后通过回调函数生成配置并执行，公共动画就通过这种方式执行，此方法不对外开放隐藏于内部
	   			//If function style animation is the animation style rules will be in the queue is completed through the callback function to generate the configuration and execution, public animation is performed in this way, this method is not open to the public in the internal
	   			
	   			var returnOptions = isFunction(style) ? style : fake; 
	   			
	   			//自动判断并获取回调函数
	   			//Automatic judgment and obtain the callback function
	   			
	   			var callback = isFunction(time) ? time : isFunction(callback) ? callback : fake;
	   			
	   			//根据动画样式及配置参数获取动画名称及配置副本，将自动根据样式创建动画帧，相同的动画样式将缓存不会重复创建帧
	   			//According to the animation style name and a copy of the configuration and the configuration parameters for animation, will create animation frames automatically according to the style, the same style of animation will create frame cache will not be repeated
	   			
	   			var options = returnOptions ? fake : parseAnimationOptions(style,time);
	   			
	   			//获取配置副本
	   			//To obtain a copy of the configuration
	   			
	   			var copyOptions = options[1];
	   			
	   			//获取动画样式属性
	   			//For animation style properties
	   			
	   			var options = options[0];
	   			
	   			var $this;
	   			
	   			var queue;
	   			
	   			//如果指定使用回调函数生成配置参数
	   			//If the specified using the callback function to generate configuration parameters
	   			
	   			if(returnOptions){
	   				
	   				//则options为回调函数，而callback变成数组作为回调函数的参数使用
	   				//The options for the callback function, and the callback into array used as the parameters of the callback function
	   				
	   				options = returnOptions;
	   				
	   				callback = isArray(time) ? time : [time];
	   				
	   			}
	   			
	   			//设置动画事件兼容类型，同时绑定有前缀及无前缀的事件
	   			//Set compatible animation event type, and there is no prefix binding prefix and events
	   			
	   			attr_animationStart+=' '+ltrim(attr_animationStart,browser)[attr_toLowerCase]();
	   			
	   			attr_animationEnd+=' '+ltrim(attr_animationEnd,browser)[attr_toLowerCase]();
	   			
	   			return bind(myself,function(){
	   				
	   				$this = this;
	   				
	   				//如果当前文档元素没有动画队列属性则设置默认值
	   				//If the current document element does not animation queue attribute to set the default values
	   				
	   				if(!$this[attr_animationQueue]){
	   					
	   					$this[attr_animationQueue] = [];
	   					
	   					//添加动画开始执行事件，在动画开始时设置动画运行状态为真
	   					//Add animation start executing events, at the beginning of the animation set animation running state is true
	   					
	   					addEventListener([$this],attr_animationStart,animationStart);

	   					//添加动画完成事件，当动画完成时自动执行下一动画队列
	   					//Add animation to complete the event, when the animation is completed automatically execute the next animation queue
	   					
	   					addEventListener([$this],attr_animationEnd,completeAnimationQueue);
	   					
	   				};
	   				
	   				//获取动画队列
	   				//Get the animation queue
	   				
	   				queue = $this[attr_animationQueue];
	   				
	   				//向动画队列添加动画参数与回调函数
	   				//Add animation to the animation queue parameters and the callback function
	   				
	   				queue[attr_push]([options,callback,copyOptions]);
	   					
	   				//若当前动画队列运行状态为假则手动开启动画并更新动画运行状态
	   				//If the state animation queue is false manual open animation and update the animation running state
	   				
	   				if(!$this[attr_animationRuing]){
	   					
	   					$this[attr_animationRuing] = real;
	   					
	   					startAnimationQueue[attr_call]($this);
	   					
	   				}
	   				
	   			})
	   			
	   		};
	   		
	   		
	   		//创建框架并向框架中插入指定类型的元素以获取该元素类型的默认样式
	   		//Create a framework and specify the type of elements into the framework for the element type of the default styles
	   		
	   		var getDefaultDisplay = function(tag,attr_display,attr_none){
	   			
	   			var attr_createElement = 'createElement';
	   			
	   			var attr_appendChild = 'appendChild';
	   			
	   			var attr_document = attr_documentElement[attr_substr](0,8);
	   			
	   			//创建框架
	   			//Create a framework
	   			
	   			var iframe = document[attr_createElement]('iframe');
	   			
	   			//根据指定的标签名称创建标签
	   			//Based on the specified tag name to create labels
	   			
	   			var tag = document[attr_createElement](tag.tagName);
	   			
	   			var iframeWindow;
	   			
	   			//将框架进行隐藏
	   			//Will be hidden frame
	   			
	   			css([iframe],attr_display,attr_none);
	   			
	   			//将标签插入框架中，然后获取标签的默认样式，完成之后再将框架从文档中删除并返回获取到的默认样式
	   			//Insert tag framework, then label the default styles, complete then the framework will be deleted from the document and return to get the default styles
	   			
	   			document[attr_documentElement][attr_appendChild](iframe);
	   			
	   			iframeWindow = iframe.contentWindow;
	   			
	   			iframeWindow[attr_documentElement]
	   			
	   			iframeWindow[attr_document][attr_documentElement][attr_appendChild](tag);
	   			
	   			tag = css([tag],attr_display);
	   			
	   			iframe[attr_parentNode]['remove'+attr_appendChild[attr_substr](6)](iframe);
	   			
	   			return tag
	   			
	   		};
	   		
	   		
	   		//常用动画的回调函数fade slide show等动画均通过此回调函数生成样式配置
	   		//The callback function of common animation fade slide show animation, etc by the callback function, producing style configuration
	   		
	   		var commonAnimation = function(style,display,options,callback,opacity){
	   			
	   			var attr_none = 'none';
	   			
	   			var attr_overflow = 'overflow';
	   			
	   			var attr_hidden = 'hidden';

	   			var $this = this;
	   			
	   			var self = [$this];
	   			
	   			var isFadeTo = display > 2;
	   			
	   			var opacity =  isFadeTo ? toNumber(options) || toNumber(callback) || toNumber(opacity) : fake;
	   			
	   			var options =  isFadeTo ? callback : options;
	   			//获取当前元素的显示模式
	   			//Access to the current element display mode
	   			
	   			var currentDisplay = css(self,attr_display);
	   			
	   			//获取当前元素的透明度
	   			//For the transparency of the current element
	   			
	   			var currentOpaticy = css(self,attr_opacity);
	   			
	   			//保存显示时的样式
	   			//The style of the save is displayed
	   			
	   			var showStyle = {};
	   			
	   			//保存隐藏时的样式
	   			//The style kept hidden
	   				
	   			var hideStyle = {};
	   				
	   			var attr;
	   			
	   			//判断是否执行显示动画，display为0表示隐藏，1表示显示，若为2则进行切换根据当前显示模式进行判断取反
	   			//Determine whether to perform according to animation, display of 0 said hidden, 1 said, according to the switching for 2 take the judgment according to the current display mode
	   			
	   			var isShow = display == 2 ? currentDisplay == attr_none  :display;
	   			
	   			//获取回调函数
	   			//Access to the callback function
	   			
	   			var callback = isFunction(options) ? options : isFunction(callback) ? callback : isFunction(opacity) ? opacity : fake;
	   			
	   			//遍历所需要设置的样式属性然后生成显示与隐藏的样式
	   			//Traverse the need to set the style attribute and then generate the style of the show and hide
	   			
	   			each(style,function(){
	   				
	   				//要显示的样式为当前元素的样式
	   				//To show the style of the style for the current element
	   				
	   				showStyle[attr = this] = css(self,attr);
	   				
	   				//要隐藏的样式都为0
	   				//To hide the styles are 0
	   					
	   				hideStyle[attr] = 0;
	   					
	   			});
	   			
	   			//如果需要设置溢出属性则强制设置溢出样式为隐藏，动画结束后会自动清除，因兼容所以单独使用css控制
	   			//If you need to set the overflow property is forced to set the overflow style to hide, after the animation is automatically cleared, compatible so separate control using CSS
	   			
	   			if(hideStyle[attr_overflow]!==undefined )css(self,attr_overflow,attr_hidden);
	   			
	   			//显示动画中的显示模式不能为none，如果当前显示模式为none则获取当前元素默认的显示模式，不能强制设置为块级否则将影响元素本身的显示模式与布局
	   			//Can't display in the animation display mode to none, if the current display mode to none has access to the current element to the default display mode, cannot force is set to block level otherwise will affect the display mode and the layout of the element itself
	   			
	   			showStyle[attr_display] = currentDisplay == attr_none ? getDefaultDisplay($this,attr_display,attr_none) : currentDisplay;
				
				//隐藏时的动画显示模式为none
				//Hide the animation display mode to none
				
				hideStyle[attr_display] = attr_none;
				
				if(isFadeTo){
					
					//当执行fadeto动画时动画显示状态根据当前透明度是否为元素的透明度进行判断
					//When performing the fadeto animation animation display status according to whether the current transparency for elements of transparency
					
					isShow = currentOpaticy != showStyle[attr_opacity];
					
					//结束时的透明度为所指定的透明度
					//At the end of the transparency as specified by the transparency
					
					hideStyle[attr_opacity] = opacity;
					
					//设置显示模式为未定义，当样式值为未定时器不会加入样式中，当未设置显示模式时动画完成之后不会清除动画前的样式
					//Set the display mode to undefined, when style value for the timer will not add to the style, when not set the display mode animation completed not cleared before the animation style
					
					hideStyle[attr_display] = showStyle[attr_display] = undefined;
					
				}
				
				//如果要执行显示且当前元素已经显示，或要执行隐藏但当前元素已经隐藏，那么强制设置结束时的样式等于起始时样式，样式虽未改变但是依旧按时间执行动画队列中的回调函数
				//If you want to perform and the current element have shown that have been hidden, the current element or to perform a hidden but the compulsory set at the end of the style is equal to the initial style, style did not change but still implement the callback function in the animation queue according to time
				
	   			if(isShow && currentDisplay !=attr_none  || !isShow && currentDisplay==attr_none ){
	   				
	   				hideStyle = showStyle = {} 
	   				
	   			}else{
	   				
					//设置元素显示，无论是显示或隐藏动画，开始显示时的显示模式应为显示状态
					//Set elements, according to whether to show or hide the animation, began to show the display mode should be display status
					
					css(self,attr_display,showStyle[attr_display]);
	   				
	   			}
	   				
				//调用动画解析函数返回新的options，返回值为数组格式，第一个元素为动画样式，第二个参数为副本配置
				//Call animation analytic function returns the new options, the return value is an array format, the first element for the animation style, the second parameter is a copy of the configuration
				
				options = parseAnimationOptions({0:isShow?hideStyle:showStyle,100:isShow?showStyle:hideStyle},options);
				
				//数组中的第二个元素应该为回调函数因此此处强制在数组的第二个位置插入回调函数
				//The second element in an array should be callback function therefore forced to the second position in the array insert here the callback function
				
				options[attr_splice](1,0,callback);
				
				//设置公共动画运行状态为真
				//Set the animation running state is true
				
				$this[attr_commonAnimationRuing] = real;
				
				
	   			//返回队列中所需要的options参数
	   			//The options parameter needed to return to the queue
	   			
	   			return options
	   			
	   		};
	   		
	   		//动态生成常用动画方法，此写法只为简化代码体积
	   		//Dynamically generated animation methods, this writing only to simplify the code size
	   		
	   		//定义动画的两种状态至于to则是例外
	   		//Two states as for the to define the animation is an exception
	   		
	   		var slideType = 'Out In To Up Down'[attr_split](pattern_space);
	   		
	   		//将动画状态拆分为三个数组分别对应fade slide show
	   		//The animation state into three arrays respectively corresponding to fade slide show
	   		
	   		var types = [slideType[attr_splice](0,3),slideType];
	   		
	   		//定义公共动画所需要的样式属性
	   		//Needed to define public animation style properties
	   		
	   		var commonAnimationStyle = 'padding height overflow'[attr_split](pattern_space);
	   		
	   		//将公共动画样式分为三组对应三种不同类型动画
	   		//Public animation style can be divided into three groups corresponding to three different types of animation
	   		
	   		var commonAnimationStyle = [[attr_opacity],commonAnimationStyle,(attr_opacity+' width margin')[attr_split](pattern_space)[attr_concat](commonAnimationStyle)];
	   		
	   		//遍历公共动画名称
	   		//Traverse the public name of the animation
	   		
	   		each('fade slide hide show toggle'[attr_split](pattern_space),function(i){
	   			
	   			var self = this;
	   			
	   			//根据当前的索引值获取对应的动画样式后缀名，若不存在则使用空值，hide之后的不需要后缀
	   			//Based on the current index values to obtain the corresponding animation style suffix, if use the null value does not exist, don't need a suffix after hide
	   			
	   			each(types[i] ? types[i][attr_concat](['Toggle']) : [empty],function(j){
	   				
	   				//拼接动画名称
	   				//Joining together the animation name
	   				
	   				var method  = self+this;
	   				
	   				//根据当前索引值获取当前动画所需要使用的样式或使用默认样式
	   				//Based on the current index values for current animation need to use the style or use the default styles
	   				
	   				var methodStyle = commonAnimationStyle[i] || commonAnimationStyle[2];
	   				
	   				//如果是slide动画则设置padding属性只改变上下不改变左右
	   				//If the slide of the animation set padding properties only changed not up and down or so
	   				
	   				if(i==1){
	   					
	   					//修改padding样式为上下方向
	   					//Modify the padding style for the up and down direction
	   					
	   					methodStyle[attr_push](methodStyle[0]+'-top');
	   					
	   					methodStyle[0]+='-bottom';
	   					
	   				}
	   				
	   				//获取动画显示状态，j的状态为 0 1 2 分别代表 隐藏 显示 与切换
	   				//For animation display status, j status of 0 1 2 represent the hidden display and switch
	   				
	   				if(!i)j = j==2? 3:j>2 ?2:j;
	   				
	   				//如果是fadeto则强制修改j值以便获取到正常的动画显示状态
	   				//If it is fadeto is forced to modify j values in order to get to normal animation display status
	   				
	   				j = types[i] ? j : i-2;
	   				
	   				nick[attr_fn][method] = function(options,callback,opacity){
	   					
	   					//调用动画当为fadeto时才传递透明度
	   					//Call the animation when for fadeto didn't pass the transparency
	   					
	   					return animation(this,commonAnimation,[methodStyle,j,options,callback,j>2?opacity:undefined])
	   					
	   				}
	   				
	   			})
	   			
	   		})
	   		
	   		
	   		//绑定动画方法，第一个参数为动画样式，第二个参数为时间或json配置，第三个参数为回调函数
	   		//Binding method of animation, the first parameter for animation style, the second parameter is sometimes json configuration, the third argument to the callback function
	   		
	   		nick[attr_fn][attr_animation] = function(css,options,callback){
		   			
		   		return animation(this,css,options,callback)
		   			
		   	};
		   	
		   	//绑定动画队列清除方法
		   	//Binding animation queue clearance method
		   	
	   		nick[attr_fn].stop = function(){
		   			
		   		return clearAnimationQueue(this)
		   			
		   	};
		   	
		   	
		})();
   		
    	
    	//绑定事件添加方法但不提供在此方法上使用事件委托的参数
    	//Add methods binding events but does not provide use event delegation parameters in this method
    	
   		nick[attr_fn][attr_addEventListener] = function(type,callback){
    			
   			return addEventListener(this,type,callback)
    			
   		};

    		
    	//动态绑定常用事件
    	//Dynamic binding common events
    	
    	(function(){
    		
    		var attr_className = 'className';
    		
    		var attr_offset = 'offset';
    		
    		var attr_width = 'Width';
    		
    		var attr_height = 'Height';
    		
    		var attr_left = ucword(direction[2]);
    		
    		var attr_top = 'Top';
    		
    		var attr_position = 'position';
    		
    		var attr_parent = attr_parentNode[attr_substr](0,6);
    		
    		var attr_offsetParent = attr_offset+ucword(attr_parent);
    		
    		//属性操作方法，若仅指定属性名则返回属性值，若属性名为对象则批量设置属性值，若属性名与值都存在则设置单个属性，若remove参数为真则删除指定属性
    		//Attribute operation method, if only to specify the property name is returned attribute values, if attribute called the batch set attribute value, if the property name and value are setting a single property, is true if the remove parameters specified attributes are removed
    		
    		var attr = function(myself,attr,value,remove){
    			
    			var $this = myself[0];
    			
    			var options = {};
    			
    			//获取回调函数
    			//Access to the callback function
    			
    			var callback = isFunction(attr) ? attr :isFunction(value) ? value : fake;
    			
    			var attr_etAttribute = 'etAttribute';
	
				var attr_getAttribute = 'g' + attr_etAttribute;
		
				var attr_setAttribute = 's' + attr_etAttribute;
				
				//获取当前元素的属性
				//Gets the current attribute of the element
				
				var attr_currentAttribute = $this ? $this[attr] : vacancy;
				
				var is_getAttribute;

    			//若属性名不是对象且值为未定义且未指定启用删除方式将返回属性值
    			//If the property name not object and value is undefined and not specified to enable deletion method returns the attribute value
    			
    			if(!isObject(attr) && value === undefined && $this && !remove)return attr_currentAttribute === undefined ? $this[attr_getAttribute](attr) : attr_currentAttribute;
    					
    			
    			//强制属性设置时的格式为对象
    			//Mandatory attribute set format for the object
    			
    			isObject(attr) ? options = attr : options[attr] = value;
    			
    			return bind(myself,function(index){
    				
    				$this = this;
    				
    				each(options,function(i){
    					
    					//获取当前指定的属性值
    					//Gets the current specified attribute values
    					
    					value = this;
    					
    					//获取当前对象的属性
    					//Gets the current object's properties

    					attr_currentAttribute = $this[i];
    					
    					//若当前的值不是空对象则表示通过getAttribute获取的属性
    					//If the current value is not empty object represents the properties of the obtained through the getAttribute
    					
    					is_getAttribute = attr_currentAttribute ===undefined ;
    					
    					//若获取的属性值为空对象则直接通过对象获取对应的属性
    					//If get the attribute value is empty object directly through the object to obtain the corresponding attributes
    					
    					attr_currentAttribute = attr_currentAttribute === undefined ? $this[attr_getAttribute](i) : attr_currentAttribute;
    					
    					//若指定了回调函数则调用回调函数并传入当前元素的索引值与当前的属性值，获取返回值
    					//If the specified callback function then calls the callback function is introduced to the current element index value and the current property value, obtain the return value
    					
    					value = callback ? callback[attr_call]($this,index,attr_currentAttribute) : value;
    					
    					
    					if(remove){
    						
    						//将属性名以空格拆分可以批量删除属性
    						//The attribute name with a space resolution can batch delete attributes
    						
    						each(i[attr_split](pattern_space),function(){
    							
    							$this['remove'+attr_setAttribute[attr_substr](3)](this);
    						
    						})
    						
    					}else{
    						
	    					//若值为是未定义则设置对象的属性
	    					//If the value is undefined, set the object's properties
	    					
	    					value === undefined || is_getAttribute ? $this[attr_setAttribute](i,value): $this[i] = value;
    					
    					}
    					
    				})
    				
    			})
    			
    			
    		};
    		
    		
    		//部分事件的首发单词一致因此使用如下方法配置减少代码体积，鼠标、键盘、滑动、触摸等单词相同，因此可以在类型列表中获取，不在类型列表中的则默认为空
    		//Part of the event's starting words so configuration using the following method to reduce the code size, such as mouse, keyboard, slide, touch words are the same, so can get in the type list, is not the default type list is empty
    		
    		var types = 'click mouse touch slip key'[attr_split](pattern_space);
    		
    		var updown = direction[attr_slice](0,2).join(' ');
    		
    		//事件分为六组与类型列表对应，在类型列表中获取不到则默认为空
    		//Events are divided into six groups with type list, get less than the default in type list is empty
    		
    		each([' dbl long'[attr_split](pattern_space),('over ennter out leave move'+updown)[attr_split](pattern_space),'start end move cancel'[attr_split](pattern_space),[empty][attr_concat](direction),updown[attr_split](pattern_space),'load error change scroll resize'[attr_split](pattern_space)  ],function(i){
    			
    			//遍历每组中的事件名称并根据事件类型生成新的事件名称
    			//Traversal events in each group name and generate a new event depending on the type of event names
    			
    			each(this,function(){
    				
    				var typePrefix = types[i] || empty;
    				
    				var type = this;
    				
    				//第一组事件类型使用后缀其它使用前缀
    				//The first set of event types use suffix other use the prefix
    				
    				nick[attr_fn][type = i ? typePrefix+type : type+typePrefix] = function(callback){
    					
    					return addEventListener(this,type,callback)
    					
    				}
    				
    			})
    			
    		});
    		
	    	//判断是否拥有指定类名
	    	//Determine whether has specified the name of the class
	    	
			var hasClass = function(myself,className) {
				
				return myself ? new RegExp('\\b' + className + '\\b')[attr_test](myself[attr_className]) : fake
		
			};
		
			//类名操作方法
			var classEditor = function(myself,className, type) {
				
				//将类名以空格拆分以支持同时操作多个类名
				//The class name with a space resolution in support of operation at the same time more than one class name
				
				var className = (className + empty)[attr_split](pattern_space);
		
				var $this;
		
				var currentClass;
		
				var current;
		
				var index;
		
				return bind(myself, function() {
		
					$this = this;
					
					//获取当前元素的类名并以空格拆分成数组
					//Access to the class name of the current element and space into an array
		
					currentClass = $this[attr_className][attr_split](pattern_space);
					
					//遍历要操作的类名
					//Traverse to the class name of the operation
					
					each(className, function() {
		
						current = this;
						
						//获取当前类名在元素类名中的索引位置
						//Gets the class name in the index of the element class names
						
						index = inArray(current, currentClass, real);
						
						//若type为假且类名不在元素类名中则将类名添加到当前类名中
						//If the type is false and element of the name of the class is not in the name of the class, add the name of the class to the current in the name of the class
						
						if(!type && index < 0) {
		
							currentClass[attr_push](current)
							
						//如果type等于1 并且类名已存在则将当前类名从数组中删除
						//If the type is equal to 1 and the name of the class will be the current existing class name is removed from the array
		
						} else if(type == 1 && index > -1) {
		
							currentClass[attr_splice](index, 1)
							
						//如果type等于2则进行类名切换
						//If the type is equal to 2 to switch from the name of the class
						
						} else if(type == 2) {
							
							//若类名存在从数组中删除否则添加到数组中
							//If the name of the class is deleted from the array or added to the array
							
							index > -1 ? currentClass[attr_splice](index, 1) : currentClass[attr_push](current)
						}
					})
					
					//更新类名
					//Update the name of the class
		
					$this[attr_className] = currentClass.join(' ')
		
				})
		
			};

    		
    		
    		//动态绑定html text val方法
    		//Dynamic binding HTML text val method
    		
    		each('html text val'[attr_split](pattern_space),function(i){
    			
    			var self = this;
    			
    			var type = i==1 ? ucword(self) : self[!i?attr_toUpperCase:attr_toLowerCase]();
    			
    			var type = (i<2 ? 'inner' :empty)+type+(i>1?'ue':empty);
    			
    			nick[attr_fn][self] = function(value){
    				
    				return attr(this,type,value)
    				
    			}
    			
    		});
    		
    		//动态绑定addclass removeclass toggleclass等类名操作方法
    		//The name of the class operation such as dynamic binding addclass removeclass toggleclass method
    		
    		each('add remove toggle'[attr_split](pattern_space),function(i){
    			
    			var method = this+'Class';
    			
    			nick[attr_fn][method] = function(className){
    				
    				return classEditor(this,className,i)
    				
    			}
    			
    		});
    		
			//动态绑定常用的width height scrollWidth scrollHeight scrollLeft scrollTop offsetWidth offsetHeight等方法
			//Dynamic binding common width height scrollWidth scrollHeight offsetWidth scrollLeft scrollTop offsetHeight method, etc
			
    		each(('client '+attr_offset+' scroll')[attr_split](pattern_space),function(i){
    			
    			var self = this;
    			
    			each((attr_width+' '+attr_height+' Left Top')[attr_split](pattern_space),function(j){
    				
    				var $this = this;
    				
    				//方法名等于外层循环加内层循环，当i值为0时则忽略client
    				//The method name is outer loop and the inner loop, when I ignore the client value is 0
    				
    				if(j<2 || i>1)nick[attr_fn][!i ? $this[attr_toLowerCase]() : self+$this] = function(value){
    					
    					//调用属性获取方法获取对应的属性，如果是scrollleft scrolltop则可以设置滚动条位置，不写参数则返回滚动条位置
    					//Call access method to obtain the corresponding attribute, if is scrollleft scrolltop can set the scroll position, don't write the scrollbar position parameters
    					
    					return attr(this,self+$this,j>1?value:undefined)
    					
    				}

    			})
    			
    		});
    		
    		//将左与上字符强制转换成小写以便后续使用
    		//Will be forced into lowercase characters on a left and for subsequent use
    		
    		attr_left = attr_left[attr_toLowerCase]();
    		
    		attr_top = attr_top[attr_toLowerCase]();
    		
    		
    		//绑定offset方法获取元素到页面的偏移位置以及宽高
    		//Binding offset method for element to the page of offset high and wide
    		
    		nick[attr_fn][attr_offset] = function(){
    			
				var $this = this[0];
				
				var self = $this;
				
				var offsetLeft = 0;
				
				var offsetTop = 0;
				
				var pattern_body = /body|html/i;
				
				var attr_tagName = 'tagName';
				
				//拼接属性名
				//Joining together the property name
				
				var attr_offsetLeft = attr_offset+ucword(attr_left);
				
				var attr_offsetTop = attr_offset+ucword(attr_top);
				
				var offset = {};
				
				//获取当前元素的宽高包含边框
				//To obtain high width of the current element contains borders
				
				offset[attr_width[attr_toLowerCase]()] = $this ? $this[attr_offset+attr_width] :0;
					
				offset[attr_height[attr_toLowerCase]()] = $this? $this[attr_offset+attr_height] :0;
				
				//向上循环查找并累计偏移量
				//Find and accumulated offset upward cycle
				
				do{
					//如果元素定位不是static或者是当前元素则累计其偏移量
					//If the element positioning is not static or is the current element is the offset
					
					if(css([$this],attr_position)!='static' || self == $this){
							
						offsetLeft+=$this[attr_offsetLeft];
							
						offsetTop+=$this[attr_offsetTop];
							
					}
					
					//身上获取父级元素
					//From the parent element
					
					$this = $this[attr_parentNode];
					
				//若元素存在且不是body或html则执行循环
				//If the element exists and is not the body or HTML execution loop
						
				}while($this && !pattern_body[attr_test]($this[attr_tagName]));
					
				//保存左与上偏移量
				//Save in the left and the offset
				
				offset[attr_top] = offsetTop;
				
				offset[attr_left] = offsetLeft;
				
				return offset
	    			
    		};
    		
    		//绑定offsetParent方法获取最近的有定位的父级元素
    		//Binding the offsetParent method to get the recent with positioning of the parent element
    		
    		nick[attr_fn][attr_offsetParent] = function(){
    			
    			var elements = [];
    			
    			var offsetParent;
    			
    			bind(this,function(){
    				
    				//通过offsetParent属性获取就近的有定位的父级元素，若存在则添加到数组中
    				//By the offsetParent property for the nearest location of the parent element, if any are added to the array
    				
    				offsetParent = this[attr_offsetParent];
    				
    				if(offsetParent) elements[attr_push](offsetParent)
    				
    			})
    			
    			return nick(elements)
    		};
    		
    		//绑定position方法获取当前元素到父级元素的左及上偏移量
    		//Bind the position method to get the current element to the parent element on the left and the offset
    		
    		nick[attr_fn][attr_position] = function(){
    			
    			var $this = this;
    			
    			//获取当前对象的偏移量
    			//Get the current offset of objects
    			var $this_offset = $this[attr_offset]();
    			
    			//获取父级对象的偏移量
    			//Access to the parent object of the offset
    			
    			var parent_offset = $this[attr_parent]()[attr_offset]();
    			
    			var position = {};
    			
    			//保存当前元素到父级的偏移量，父级偏移减当前元素的偏移量就是元素到父级的偏移量
    			//Save the current element to the offset of the parent, the parent element migration reduce the offset of the current element is to the offset parent
    			
    			position[attr_left] = $this_offset[attr_left] - parent_offset[attr_left];
    			
    			position[attr_top] = $this_offset[attr_top] - parent_offset[attr_top];
    			
    			return position
    			
    		};
    		
    		//批量绑定方法
    		//Bulk binding approach
    		
    		nick[attr_fn][attr_extend]({
    		
	    		//设置触摸生效时间或长按生效时间
	    		//Set the effective time of touch or long in time
	    		
	    		setTouchTime:setTouchTime,
	    		
	    		on:function(type,callback,selector){
	    			
	    			//通过事件委托绑定事件自动添加下划线
	    			//Automatically by the entrusted binding events underline
	    			
	    			return addEventListener(this,'_'+type,callback,selector)
	    		},
	    		
	    		//事件移除，第一参数事件类型，第二参数函数，第三参数选择器，如果指定选择器则表示移除事件委托（未来元素绑定的事件）
	    		//Event to remove, the first parameter event type, the second parameter function, the third parameter selection, if you specify a selector is said to remove event delegation (future element binding events)
	    		
	    		undelegate : function(type,callback,selector){
	    			
	    			
	    			return removeEventListener(this,type,callback,selector)
	    			
	    		},
	    		
	    		//设置或获取样式
	    		//To set or get style
	    		
	    		css : function(attr,value){
	    			
	    			return css(this,attr,value)
	    			
	    		},
	    		
	    		//设置或获取属性，若第二参数为未定义则获取指定属性，若第二参数不是对象则是设置单条属性，若第二参数为对象则设置多个属性
	    		//To set or retrieve attributes, if the second parameter for undefined get specified attributes, if the second parameter is not object is set a single property, if the second parameter is set up multiple attribute for the object
	    		
	    		attr:function(key,value){
	    			
	    			return attr(this,key,value)
	    			
	    		},
	    		
	    		//删除指定的属性
	    		//Remove the specified attributes
	    		
	    		removeAttr:function(key){
	    			
	    			return attr(this,key,undefined,real)
	    			
	    		},
	    		
	    		//判断是否拥有指定类名
	    		//Determine whether has specified the name of the class
	    		
	    		hasClass:function(className){
	    			
	    			return hasClass(this[0],className)
	    			
	    		},
	    		
				//从当前已匹配元素中获取指定索引的元素
				//From the current has the element at the specified index of the matched elements to derive
				
				eq:function(index){
					
					return nick(this[index])
					
				},
				
				//返回当前所匹配元素中的第一个元素
				//Returns the first element in the matched elements
				
				first:function(){
					
					return nick(this[0])
					
				},
				
				//返回当前所匹配元素的最后一个元素
				//Returns the last element of the matched elements
				
				last:function(){
					
					return nick(this[attr_slice](-1))
					
				},
				
				//根据索引值截取当前所匹配元素中的元素
				//According to the index value capture the current element in the matched elements
				
				slice:function(start,end){
					
					return nick(Array[attr_prototype][attr_slice][attr_call](this,start,end))
					
				},
				
				//清除当前元素的子节点使用当前元素变为空节点
				//Remove the current element's child nodes using the current element into an empty node
				
				empty:function(){
					
					return this.html(empty)
					
				}
				
    		});

    	})();
    	
   	})();

	//绑定辅助函数到nick函数上
	//Binding auxiliary function to the Nick function
	
	(function(){
		
		var attr_trim = 'trim';
		
		var attr_readyState = 'readyState';
		
		var attr_complete = 'complete';
		
		//存储dom加载完成之后要执行的函数
		//Store the dom to be executed after completion of loading function
		
		var readyQueue = [];
		
		//保存文档是否加载完成
		//Save the document is loaded
		
		var isComplete;
		
		//将json字符串转换成json数据，若数据格式错误将抛出异常
		//To convert a json string to the json data, if the data format errors will throw an exception
		
		var parseJSON = function(data){
			
			return JSON.parse(data)
			
		};
		
		//递归遍历数据，第一参数为数据，第二参数为要执行的回调函数
		//The recursive traversal data, the first parameter to the data, the second parameter is the callback function to be executed
		
		var map = function(data,callback,i,path){
			
			//若指定回调函数则进行遍历处理
			//If the specified callback function through processing
			
			if(isFunction(callback)){
				
				//保存遍历的路径关系，比如a.b.c 当处理到b时得到的路径是a.b
				//Save the traversal path relationships, such as A.B.C when processing path is a. to b
				
				path = path === undefined ? empty : path;
				
				//如果当前的数据是对象或数组格式则遍历数据进行处理
				//If the current data is an object or array format is traversing the data for processing
				
				if(isObject(data) || isArray(data)){
					
					return each(data,function(i){
						
						//递归调用传入当前数据，回调函数，i是当前数据的索引值，path则是路径，此处主要为了param功能预留
						//Recursive calls to the current data, the callback function, I is the index value of the current data, the path is the path, here mainly to param function reserve
							
						return map(this,callback,i,path ? path+'['+i+']':i)
							
					})
						
				}else{
					
					//否则直接调用回调函数并将this指向当前处理，并传入索引值与路径
					//Otherwise the callback function is invoked directly and this points to the current processing, and introduced to index values and path
					
					return callback[attr_call](data,i,path)
						
				}			
				
			}
			
			
		};
		
		//将数据转换为url参数格式的字符串
		//Converts the data to the url parameter format string
		
		var param = function(data,depth){
			
			var str = '';
			
			//递归遍历数据
			//The recursive traversal data
			
			map(data,function(i,path){
				
				//将字符串进行拼接，对数据进行编码处理每条数据以&符号连接
				//The string for Mosaic, encodes data processing each data to connect the & symbol
				
				str+=path+'='+encodeURIComponent(this)+'&';
				
			})
			
			//返回处理后的数据
			//Returned after processing the data
			
			return str || data+empty
		};
		
		
		//将数据进行覆盖，第一参数为原始数据，之后的参数都将与第一参数进行覆盖而非合并。若第一参数有属性a那么第二参数的a属性将覆盖第一参数，但若第二参数有属性b而第一参数没有将不做处理
		//Cover the data, the first parameter to the original data, after the parameters will be the first to cover instead of the merger. If the first parameter is a property a second parameter of a property will cover the first parameter, but if the second parameter have attributes and the first parameter is not b will not be done
		
		var cover = function(){
			
			//获取参数列表
			//Get parameter list
			
			var items = toArray(arguments);
			
			//获取第一个参数作为目标数据
			//For the first parameter as the target data
			
			var target = items[attr_shift]();
			
			//创建数据副本，并不操作传入的参数
			//Create a copy of the data, not operating incoming parameters
			
			var options = {};
				
			var self;
				
			var $this;
			
			//遍历目标数据
			//Traverse the target data
			
			each(target,function(i){
					
				$this = this;
				
				//遍历要进行合并的参数
				//Traverse to the parameters of the merger
					
				each(items,function(){
						
					self = this;
					
					//若当前数据或当前数据的属性值为未定义则使用目标数据的值，否则使用当前数据的属性值
					//If the current data or current data attribute value is undefined, the use of the target data value, or use the current data attribute values
					
					options[i] =  self === undefined ? $this : (self[i] === undefined ? $this : self[i])
						
				})
					
			})
			
			//返回处理后的副本数据
			//Returns a copy of the data after processing
			
			return options
				
		};
		
		//将两个数组合并成对象，第一个数组中的值将作为属性名，第二个数组中的值将作为属性值，若第二个数组长度比第一个数组长度长则忽略多余的部分
		//Merge the two arrays into objects, the first values in the array will be as a property name, the second the values in the array will be used as attribute value, if the second number length is longer than the first array length is ignore the spare parts
		
		var array2Object = function(attr,value){
			
			var data = {};
			
			var value = value || {};
			
			//遍历属性数组
			//Traverse the attribute array
			
			each(attr,function(i){
				
				//当前值作为数据的属性名，value数组中对应的值作为属性值
				//Current value as a data attribute name and value in the array corresponds to the value of the as attribute values
				
				data[this] = value[i] === undefined ? empty : value[i] 				
				
			});
			
			//返回合并后的对象
			//Returns the combined object
			
			return data
			
		};
		
		//更为安全的方式调用指定的回调函数，比eval要安全，第一个参数为函数名可以是函数或字符串，第二个参数是函数的上下文对象默认为window
		//A more secure way to invoke the specified callback function, more security than the eval, the first parameter to the function name can be a function or a string, the second parameter is a function of the context object is the window by default
		
		var	callback = function(){
			
			//获取参数列表
			//Get parameter list
			
			var items = toArray(arguments);
			
			//获取回调函数
			//Access to the callback function
			
			var callback = items[attr_shift]();
			
			//获取上下文对象默认为window对象，该参数在调用对象中的方法时非常有用。若想调用a.b.c中的c函数则函数名写成'a.b.c'而上下文对象为a
			//Access to the context object by default for the window object, the parameter is a very useful method in the call object. If you want to call c functions are functions of the A.B.C written 'A.B.C and context object is a
			
			var context = items[attr_shift]() || window;
			
			//获取回调函数
			//Access to the callback function
			
			var functions;
			
			//若指定的回调函数不是函数则转换成字符串进行拆分查找
			//If the specified callback function is not function is converted to the string to find
			
			if(!isFunction(callback)){
				
				
				//将函数名强制转换为字符串将以.进行拆分
				//The function name will be cast to strings. Split
				
				functions = (callback+empty)[attr_split]('.');
				
				//回调函数默认等于上下文对象，然后逐级向上查找
				//The default is equal to the context object callback function, and then step by step upward
				
				callback = context;
				
				//遍历函数路径
				//Path traversal functions
				
				each(functions,function(){
					
					//向上查找，例如a.b.c 默认上下文对象为window然后是window.a window.a.b window.a.b.c
					//Up to find, for example, A.B.C default context object to the window and then the window. A window. A. window. The A.B.C
					
					if(callback) callback = callback[this]
						
				})
					
			}
			
			//若回调函数是函数则直接调用回调函数将将this指向上下文对象，传递参数数组,并返回回调函数的返回值
			//If the callback function is the function is called directly the callback function will be pointed to this context object, passing parameters arrays, and returns the return value of the callback function
			
			if(isFunction(callback)) return callback[attr_apply](context,items)
				
		};
		
		//定义ajax数据请求函数
		//Define ajax data request function
		
		var ajax = function(options){
			
			//保存队列的属性名称
			//Save the queue attribute names
			
			var attr_queue = attr_nick+'queue';
			
			//保存队列长度的属性名称
			//Save the queue length of the attribute name
			
			var attr_queue_length = attr_queue+attr_length;
			
			//定义需要使用的变量
			//Need to use the variables
			
			var attr_headers = 'headers';
			
			var attr_async = 'async';
			
			var attr_type = 'type';
			
			var attr_get = 'get';
			
			var attr_cache = 'cache';
			
			var attr_url = 'url';
			
			var attr_beforeSend = 'beforeSend';
			
			var attr_success = 'success';
			
			var attr_dataType = 'dataType';
			
			var attr_error = 'error';
			
			var attr_timeout = 'timeout';
			
			var attr_charset = 'charset';
			
			var attr_data = 'data';
			
			var attr_response = 'response';
			
			var attr_xml = 'xml';
			
			var attr_json = 'json';
			
			var attr_jsonp = attr_json+'p';
			
			//使用jsonp请求时可以设置回调函数的上下文对象默认为window对象，执行回调函数时使用callback进行调用
			//Can set the callback function when using the json request context object by default for the window object, when performing a callback using callback to call
			
			var attr_jsonpContext = attr_jsonp+'Context';
			
			var attr_text = 'text';
			
			var attr_parse = 'parse';
			
			var attr_status = 'status';
			
			var attr_jsonpCallback = attr_jsonp+'Callback';
			
			var attr_html = 'html';
			
			//通过属性名数组与默认值数组生成默认参数对象
			//By the property name arrays with default values generated default parameter object
			
			var defaultOptions = array2Object([attr_type,attr_async,attr_timeout,attr_cache,attr_beforeSend,attr_complete,attr_success,attr_error,attr_url,attr_headers,attr_data,attr_charset,attr_dataType,attr_jsonpCallback,attr_jsonpContext,attr_jsonp],[attr_get,real,3000,real]);
			
			//将用户传递的参数与默认参数进行覆盖
			//The user parameters passed covered with default parameters
			
			var options = cover(defaultOptions,options);
			
			var $this = ajax;
			
			//保存队列
			//Save the queue
			
			var queue;
			
			var createElement = nick.fn.create;
			
			//所有的回调函数都通过此函数执行
			//All of the callback functions are carried out by this function
			
			var ajaxCallback = function(){
				
				//获取参数列表
				//Get parameter list
				
				var itmes = toArray(arguments);
				
				//获取配置
				//getconf
				
				var options = itmes[attr_shift]();
				
				//获取上下文对象
				//Access to the context object
				
				var context = itmes[attr_shift]();
				
				//获取回调函数
				//Access to the callback function
				
				var fn = options[itmes[attr_shift]()];
				
				//执行回调函数将this指向上下文对象，并且传入数组参数，且第一个参数强制为上下文对象
				//Implement the callback function will this point to the context object, and introduced into an array parameter, and forced the first parameter to the context object
				
				if(isFunction(fn)) return fn[attr_apply](context,itmes[attr_concat](context))
				
			};
			
			//开启队列的回调函数
			//The callback function to the queue
			
			var startQueue = function(){
				
				//保存http请求状态
				//Save the HTTP request
				
				var status;
				
				//保存脚本标签
				//Save the script tags
				
				var script;
				
				//保存当前的请求配置选项
				//Save the current request configuration options
				
				var options;
				
				//保存服务器返回的数据
				//Save the data returned by the server
				
				var response;
				
				//保存xml请求对象
				//Save the XML request object
				
				var xmlrequest;
				
				//保存限制的数据类型
				//Save the limited data types
				
				var dataType;
				
				//保存要获取的返回值属性名称，一般为text或xml
				//Save for the return value of the attribute name, general text or XML
				
				var attr_responseAttr = attr_response;
				
				//保存要执行的回调函数
				//To save the callback function to perform
				
				var fn;
				
				//获取请求状态是否完成
				//Get the request state is completed
				
				var complte;
				
				//根据队列属性获取请求队列
				//According to the queue attributes for the request queue
				
				queue = $this[attr_queue];
				
				//如果请求的队列长度在1~4之间则读取队列并执行，最大并发请求限制在4条
				//If the request queue length between 1 ~ 4, read queue and executed, the maximum concurrent requests will be limited to four
				
				if($this[attr_queue_length]<4 && queue[attr_length]){
					
					//读取队列中第一组数据配置
					//The first group of data read the queue configuration
					
					options = queue[attr_shift]();
					
					//若无配置数据则终止执行
					//If no configuration data to terminate execution
					
					if(!options)return;
					
					//从配置中获取限制的数据类型若为指定默认为文本类型
					//If access restrictions from the configuration of the data type to specify a default text type
					
					dataType = options[attr_dataType] || attr_text;
					
					//每次调用时队列长度加1，当执行完时则队长长度减1
					//Each call queue length 1, when the execution of the captain length minus 1
					
					$this[attr_queue_length]++;
					
					//若数据类型为jsonp则通过创建脚本引入外部js文件
					//If the data type of the json by introducing external js file creation scripts
					
					if(dataType == attr_jsonp){
						
						//创建脚本标签
						//Create a script tag
						
						script = document.createElement('script');
						
						//指定src地址为配置中的地址
						//Specify the SRC address in for the configuration
						
						script.src = options[attr_url];
						
						//获取随机生成的回调函数
						//The callback function of the randomly generated
						
						fn = options[attr_cache+attr_jsonpCallback];
						
						//将回调函数作为全局函数使用以便脚本加载之后即可调用
						//The callback function used as a global function so that the script can be invoked after loading
						
						window[fn] = function(data){
							
							//获取配置中的回调函数
							//Access to configure the callback function
							
							var fn = options[attr_jsonpCallback];
							
							//通过ajax回调函数来调用指定的回调函数并传入参数
							//Through the ajax callback function to invoke the specified callback function and incoming parameters
							
							ajaxCallback(options,window,attr_success,data);
							
							//使用callback函数调用指定的回调函数
							//Using the callback function calls the specified callback function
							
							callback(fn,options[attr_jsonpContext] || window,data);
							
						}
						
						//将脚本插入到页面
						//The script is inserted into the page
						
						document[attr_documentElement].appendChild(script);
						
						//当脚本加载成功或加载失败时执行回调函数
						//Execute when the script loading success or failure load, the callback function
						
						return script.onload = script['on'+attr_error] = function(){
							
							//将请求队列长度减1
							//To reduce the request queue length 1
							
							$this[attr_queue_length]--;
							
							//开启下一个队列
							//Under the open a queue
							
							startQueue();
							
							//若当前脚本有父级则通过父级将当前脚本从文档中删除
							//If the current script has the parent by the parent to the current script is removed from the document
							
							!script[attr_parentNode] || script[attr_parentNode].removeChild(script);
							
						}
						
						
					}
					
					//实例化xml请求对象
					//Instantiate the XML request object
					
					xmlrequest = new XMLHttpRequest();
					
					//根据数据类型获取对应的属性名称以便获取服务器返回的数据
					//Depending on the type of data to obtain the corresponding attribute name in order to obtain the data returned from the server
					
					attr_responseAttr += (options[attr_dataType]+'')[attr_toLowerCase]() == attr_xml ?attr_xml[attr_toUpperCase]():'Text';
					
					//打开链接并指定请求方式、URL地址以及是否启用异步
					//Open the link and specify the request method, URL, and whether to enable asynchronous
					
					xmlrequest.open(options[attr_type],options[attr_url],options[attr_async]);
					
					//遍历配置中的请求头数据并设置请求头
					//The request header data traversal configuration and set the request header
					
					each(options[attr_headers],function(i){
						
						//请求头数据为json格式
						//Request header data in json format
						
						xmlrequest.setRequestHeader(i,this)
						
					});
					
					//发送数据
					//send data
					
					xmlrequest.send(options[attr_data]);
					
					//设置超时时间
					//Set the timeout
					
					setTimeout(function(){
						
						//若超时状态仍不为4则取消请求
						//If the timeout condition is still no 4, cancel the request
						
						xmlrequest[attr_readyState] == 4  || xmlrequest.abort();
							
					},options[attr_timeout]);
					
					//添加请求状态监听事件
					//Add request state monitoring events
					
					xmlrequest.onreadystatechange = function(){
						
						//若请求状态为4表示请求成功
						//If the request status to 4 said request is successful
						
						if(xmlrequest[attr_readyState] == 4){
							
							//将请求队列长度减1 并执行下一队列
							//The request queue length minus 1 and execute the next queue
							
							$this[attr_queue_length]--;
							
							startQueue();
							
							//获取http请求状态
							//Get the HTTP request
							
							status = xmlrequest[attr_status];
							
							//获取服务器返回的数据
							//Obtain the data returned from the server
							
							response = xmlrequest[attr_responseAttr];
							
							//调用函数并传递参数
							//Call a function and passing parameters
							
							ajaxCallback(options,xmlrequest,attr_complete,attr_complete);
							
							//若数据类型为html则将服务器返回的数据创建为html节点且保留文本节点
							//If the data type of HTML will be returned by the server data created as HTML nodes and keep a text node
							
							//if(dataType == attr_html) response = createElement(response,fake,real);
							
							//尝试将数据转换成html节点或json格式若发生异常则捕获后调用回调函数并终止运行
							//Attempt to convert data into HTML nodes or json format if an exception occurs after capturing the callback function and stop running
							
							try{
								
								response = dataType == attr_html ? createElement(response,real,real) : dataType==attr_json ? JSON[attr_parse](response) : response;
							
							}catch(e){
								
								return ajaxCallback(options,xmlrequest,attr_error,attr_parse+attr_error);
								
							}
							
							//根据请求状态判断是否成功
							//According to the request status determine whether success
							
							complte = status>=200 && status<300 || status==304;
							
							//调用回调函数
							//The callback function is invoked
							
							ajaxCallback(options,xmlrequest,complte? attr_success:attr_error,complte?response:attr_status+attr_error+':'+(status|| attr_timeout));
							
							
						}else if(xmlrequest[attr_readyState] == 2 && ajaxCallback(options,xmlrequest,attr_beforeSend) === fake){
							
							//若请求状态为2且发送前的回调函数返回假则取消当前的请求并开启新队列
							//If the state of the request for 2 and before sending the callback function returns false to cancel the current request and open new queue
							
							xmlrequest.abort();
							
							startQueue();
						}
						
					}
					
				}
				
			};
			
			//将传入的json参数进行解析处理
			//Will the incoming json parsing process parameters
			
			var parseOptions = function(){
				
				var attr_and = '&';
				
				//获取数据
				//getting data
				
				var data = options[attr_data];
				
				//获取缓存状态
				//Access to the cache state
				
				var cache = options[attr_cache];
				
				//获取地址并强制转换成字符串
				//Get the address and forced into a string
				
				var url = options[attr_url]+empty;
				
				//获取请求状态是否为get
				//If get request form to get
				
				var isGet = (options[attr_type]+empty)[attr_toLowerCase]() == attr_get;
				
				//获取请求头
				//Access request header
				
				var headers = options[attr_headers];
				
				//获取jsonp时发送给服务器的name名称
				//In the name of the name get sent to the server when the json
				
				var jsonp = options[attr_jsonp] || attr_call+'back';
				
				//保存回调函数名称
				//Save the callback function name
				
				var fn;
				
				//强制设置请求头为json格式
				//Mandatory set the request header to json format
				
				headers = isObject(headers) ? headers : {};
				
				//向地址上补充问号以便添加参数
				//To complement to address the question mark to add parameters
				
				url+=url[attr_indexOf]('?')>-1?'':'?';
				
				//更新配置中的地址
				//Update in the address configuration
				
				options[attr_url] = url;
				
				//强制将数据类型转换为小写
				//Force the data type is converted to lowercase
				
				options[attr_dataType] = (options[attr_dataType]+empty)[attr_toLowerCase]();
				
				//若数据类型为jsonp则生成随机函数名称
				//If the data type of the json generate a random function name
				
				if(options[attr_dataType] == attr_jsonp){
					
					//生成随机函数名称以时间戳加随机数
					//Generate random function name with the timestamp and the random number
					
					fn =attr_nick+getTime()+parseInt(Math.random()*1000);
					
					//强制设置请求类型为get方式
					//Mandatory Settings request type for the get method
					
					isGet = options[attr_type] = attr_get;
					
					//将回调函数名称添加到数据中
					//The callback function name added to the data
					
					isString(data) ? data+=attr_and+jsonp+'='+fn : data[jsonp] = fn;
					
					//将回调函数名称保存到以下属性名中
					//To save the callback function name to the following property names
					
					options[attr_cache+attr_jsonpCallback] = fn;
					
				}
				
				//若不启用缓存则向地址中添加时间戳
				//If they do not enable cache timestamp is added to the address
				
				if(!cache)options[attr_url] += attr_and+attr_nick+'='+getTime();
				
				//在请求头中添加数据类型并根据请求类型进行分别设置
				//Add the data in the request header type and set respectively according to the request type
				
				headers['Content-'+attr_type] = (isGet?'text/html;':'application/x-www-form-urlencoded;')+(options[attr_charset] ? attr_charset+'='+options[attr_charset]:'');
				
				//更新请求头
				//Update the request header
				
				options[attr_headers] = headers;
				
				//将数据转换为url参数格式
				//Converts the data to the url parameter format
				
				options[attr_data] = param(data);
				
				//若为get请求方式将数据添加到url中
				//If a get request way to add data to the url
				
				if(isGet)options[attr_url]+=attr_and+options[attr_data];
				
			};
			
			//若ajax对象没有队列属性则初始化队列为数组并设置初始长度
			//If the ajax object does not queue attribute initialization queue as array and set up the initial length
			
			if(!ajax[attr_queue]){
				
				ajax[attr_queue] = [];
				
				ajax[attr_queue_length] = 0;
				
			}
			
			//解析参数并将参数添加到队列中然后开启队列
			//Analytical parameters and will be added to the queue and then open the queue
			
			parseOptions();
			
			ajax[attr_queue][attr_push](options);
			
			startQueue();

			
		};
		
		//遍历并绑定常用数据类型检测
		//Traversal and bind the commonly used data type detection
		
		each(dataTypes,function(){
			
			var self = this;
			
			nick['is'+ucword(self)] = function(data){
				
				return type(data) == self
			}
			
		});
		
		nick[attr_trim] = trim;
		
		nick['l'+attr_trim] = ltrim;
		
		nick['r'+attr_trim] = rtrim;
		
		nick.merge = nick[attr_extend] = extend;
		
		//批量遍历并绑定方法
		//Batch traversal and binding method
		
		each({each:each,inArray:inArray,ucword:ucword,parseJSON:parseJSON,map:map,param:param,cover:cover,callback:callback,ajax:ajax},function(i){
			
			nick[i] = this
			
		});
		
		//批量绑定常用ajax方法
		each('get post jsonp'[attr_split](pattern_space),function(){
			
			var type = this;
			
			nick[type] = function(options){
				
				//强制将请求方式修改为当前类型
				//Forced to amend the requests for the current type
				
				options = options || {};
				
				options.type = type;
				
				return ajax(options)
				
			}
			
		});
		
		//绑定dom加载事件
		//Binding the dom to load
		
		nick[attr_readyState[attr_substr](0,5)] = function(callback){
				
			if(!isFunction(callback)) return nick;
			
			//若文档的状态为完成则终止并执行回调函数
			//If the state of the document to complete the termination and perform the callback function
			
			if(document[attr_readyState] == attr_complete)return callback();
			
			//将回调函数添加到队列中等待文档加载后执行
			//Add a callback function to the queue waiting for the document after loading
			
			readyQueue[attr_push](callback);
			
			//只绑定一次DOM加载函数
			//Binding only one DOM load function
			
			if(!isComplete){
				
				isComplete = real;
				
				document.addEventListener('DOMContentLoaded',function(){
					
					//遍历执行队列中的回调函数
					//Traverse the implement the callback function in the queue
					
					each(readyQueue,function(){
								
						this()
								
					})
				})
					
			}
				
		};
		
	})();
	
	window.nick = window.$ = nick;
	
})(window)
