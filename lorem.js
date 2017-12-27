var LoremJS = {};

LoremJS.generator = {};

LoremJS.get = function(numberOfWords, paragraphs = 1, selector = null)
{
	if(numberOfWords < 0)
		throw new Error('Number of words is less than 0');
	
	if(typeof paragraphs === "string") //if user wrote a selector but not a paragraph
	{
		selector = paragraphs;
		paragraphs = 1;
	}
	
	var words = Math.floor(numberOfWords/paragraphs);
	var remainder = numberOfWords - (words * paragraphs);
	
	var lorem = "";
	
	for(var i = 0; i < paragraphs; i++)
	{
		lorem += "<p>";
		if(remainder > 0)
		{
			lorem += LoremJS.generator.newParagraph(words + remainder + 1);
			remainder--;
		}
		else
		{
			lorem += LoremJS.generator.newParagraph(words + remainder);
		}
		lorem += "</p>";
	}
	
	if(selector !== null)
	{
		if(selector.charAt(0) === "#")
			document.getElementById(selector.substr(1)).innerHTML += lorem;
		else if(selector.charAt(0) === ".")
		{
			var allClass = document.getElementsByClassName(selector.substr(1));
			for(var y = 0; y < allClass.length; y++)
			{
				if(y === 0)
					allClass[y].innerHTML += lorem;
				else
					allClass[y].innerHTML += LoremJS.get(numberOfWords, paragraphs)
			}
		}
		else
			throw new Error('The selector does not specify if it is an id or a class');
	}
	else
		return lorem;
	
};

// Functions for user above
//---------
// Text generator below


LoremJS.generator.newWord = function(previousWord = '')
{
	var word = LoremJS.words[Math.floor(Math.random()*LoremJS.words.length)];
	while(word === previousWord)
	{
		word = LoremJS.words[Math.floor(Math.random()*LoremJS.words.length)];
	}
	return word;
};

LoremJS.generator.findSmallWord = function(previousWord = '')
{
	var word = LoremJS.generator.newWord(previousWord)
	while(word.length >=4)
	{
		word = LoremJS.generator.newWord(previousWord);
	}
	return word;
};

LoremJS.generator.choosePunctuation = function(dotNumber = 0)
{
	var randomForDot = Math.random();
	var randomForComma = Math.random();
	
	if(randomForDot + dotNumber > 1.5 || randomForDot < 0.03)
		return ".";
	else if(randomForComma > 0.95)
		return ",";
	else
		return "";
};

LoremJS.generator.newParagraph = function(numberOfWords)
{
	var loremText = "";
	var dotNumber = 0;
	
	var word = "";
	var previousWords = ["","",""];
	var punctuation = "";
	
	
	for(var i = 0; i< numberOfWords; i++)
	{
		if(previousWords[0].length >=6 && previousWords[1].length >=6 && previousWords[2].length >=6)
			word = LoremJS.generator.findSmallWord(previousWords[2]);
		else
			word = LoremJS.generator.newWord(previousWords[2]);
		
		previousWords.shift();
		previousWords.push(word);
		
		if(dotNumber === 0)
		{
			word = word.charAt(0).toUpperCase() + word.slice(1);
		}
		
		if(i === numberOfWords - 1)
		{
			loremText += word + ".";
			break;
		}
		
		punctuation = LoremJS.generator.choosePunctuation(dotNumber);
		if(punctuation === ".")
			dotNumber = 0;
		else
			dotNumber += 0.08;
		
		loremText += word + punctuation + " ";
	}
	
	return loremText;
};

LoremJS.words = [ //Words from https://la.wikisource.org/wiki/De_finibus_bonorum_et_malorum/Liber_Primus
	'lorem',
	'ipsum',
	'non',
	'eram',
	'nescius',
	'quae',
	'summis',
	'ingeniis',
	'exquisitaque',
	'doctrina',
	'philosophi',
	'sermone',
	'tractavissent',
	'litteris',
	'mandaremus',
	'fore',
	'ut',
	'hic',
	'noster',
	'labor',
	'in',
	'varias',
	'reprehensiones',
	'incurreret',
	'nam',
	'quibusdam',
	'et',
	'iis',
	'quidem',
	'admodum',
	'indoctis',
	'totum',
	'hoc',
	'displicet',
	'quidam',
	'autem',
	'tam',
	'id',
	'remissius',
	'agatur',
	'studium',
	'tamque',
	'multam',
	'operam',
	'ponendam',
	'arbitrantur',
	'erunt',
	'etiam',
	'contemnentes',
	'dicant',
	'legendis',
	'contra',
	'quos',
	'omnis',
	'dicendum',
	'breviter',
	'existimo',
	'vituperatoribus',
	'responsum',
	'defensa',
	'collaudata',
	'est',
	'accusata',
	'ab',
	'videretur',
	'posse',
	'plura',
	'movere',
	'hominum',
	'admissum',
	'meliore',
];