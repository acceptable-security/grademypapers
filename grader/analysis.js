var portStemmer = require('porter-stemmer').stemmer;
var fs = require('fs');

function textAnalysis(text) {
    if ( text == undefined || text.length < 1 ) {
        return undefined;
    }

    var output = {};

    output["charCount"] = text.length;
    output["alphaRatio"] = text.replace(/[^a-zA-Z]/gi, '').length / output["charCount"];
    output["digitRatio"] = text.replace(/[^0-9]/gi, '').length / output["charCount"];
    output["whiteSpaceRatio"] = text.replace(/[^\s]/gi, '').length / output["charCount"];
    output["specialRatio"] = output["alphaRatio"] + output["digitRatio"] + output["whiteSpaceRatio"];

    var charTests = "abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890\\*\\_\\+\\=\\%\\$\\@\\_\\/\\-"

    for ( var i = 0; i < charTests.length; i++ ) {
        var match = [];

        if ( charTests[i] == "\\" ) {
            match = text.match(new RegExp(charTests[i] + charTests[i+1], "g")) || [];
            i += 1;
        }
        else {
            match = text.match(new RegExp(charTests[i], "g")) || [];
        }

        output["charFreq_" + charTests[i].toString()] = match.length / text.length;
    }

    var words = text.replace('\n', ' ').replace('\t', ' ').split(' ');

    output["wordCount"] = words.length;

    var shortWordCount = 0;
    var wordLetterCount = 0;
    var totalWordLength = 0;

    var wordLength = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var uniqueWords = 0;
    var wordsCollected = {};

    for ( var i = 0; i < words.length; i++ ) {
        var word = words[i].replace('/[^a-zA-Z]/gi', '');

        shortWordCount += (word.length <= 2 && word.length > 0) ? 1 : 0;
        wordLetterCount += word.length;

        var field;

        if ( word.length >= wordLength.length - 1) {
            field = "wordSizeFreq_" + (wordLength.length - 1).toString();
            wordLength[wordLength.length - 1] += 1;
        }
        else {
            field = "wordSizeFreq_" + word.length.toString();
            wordLength[word.length] += 1;
        }

        if ( output[field] ) {
            output[field] += 1;
        }
        else {
            output[field] = 1;
        }

        if ( wordsCollected[word] != undefined ) {
            wordsCollected[portStemmer(word).toLowerCase()] += 1;
        }
        else {
            wordsCollected[portStemmer(word).toLowerCase()] = 1;
        }
    }

    var groups = {};

    for ( var key in wordsCollected ) {
        if ( wordsCollected.hasOwnProperty(key) ) {
            if ( wordsCollected[key] == 1 ) {
                if ( output["legomenaFreq"] != undefined ) {
                    output["legomenaFreq"] += 1;
                }
                else {
                    output["legomenaFreq"] = 1;
                }
            }
            else if ( wordsCollected[key] == 2 ) {
                if ( output["dislegomenaFreq"] != undefined ) {
                    output["dislegomenaFreq"] += 1;
                }
                else {
                    output["dislegomenaFreq"] = 1;
                }
            }

            if ( groups[wordsCollected[key]] != undefined ) {
                groups[wordsCollected[key]] += 1;
            }
            else {
                groups[wordsCollected[key]] = 1;
            }
        }
    }

    var m2 = 0.0;
    var ttl = words.length * (words.length - 1);

    output["simpsonD"] = 0.0;

    for ( var freq in groups ) {
        m2 += (groups[freq] * (freq * freq));
        output["simpsonD"] += (groups[freq] * (groups[freq] - 1)) / ttl;
    }

    output["simpsonD"] = 1.0 - output["simpsonD"];

    var uniqueWords = Object.keys(wordsCollected).length;

    output["yuleK"] = 10000.0 * (m2 - uniqueWords) / (uniqueWords * uniqueWords);
    output["legomenaFreq"] = output["legomenaFreq"] / words.length;
    output["dislegomenaFreq"] = output["dislegomenaFreq"] / words.length;
    output["typeTokenRatio"] = uniqueWords / words.length;
    output["sichelS"] = output["dislegomenaFreq"] / output["legomenaFreq"];
    output["honoreR"] = (100.0 * Math.log(text.length)) / (1.0 - output["sichelS"]);

    for ( var i = 0; i < wordLength.length; i++ ) {
        var field = "wordSizeFreq_" + i.toString();

        if ( output[field] ) {
            output[field] /= words.length;
        }
        else {
            output[field] = 0;
        }
    }

    output["shortWordRatio"] = shortWordCount / words.length;
    output["wordletterToTotalletter"] = wordLetterCount / text.length;
    output["averageWordLength"] = wordLetterCount / words.length;

    var sentences = text.split(/[;.!?]+/);

    output["sentenceCharLength"] =  output["charCount"] / sentences.length;
    output["sentenceWordCount"] = output["wordCount"] / sentences.length;

    return output;
}

// var test = textAnalysis(fs.readFileSync("example.txt").toString());
// console.log(JSON.stringify(test, null, 4));
// console.log(Object.keys(test).length);

module.exports = {
    analyize: textAnalysis
}
