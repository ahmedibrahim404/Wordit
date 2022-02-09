
export function replaceStringCharacter(string, index, character){
    return string.substr(0, index) + character + string.substr(index+1);
}
  
export function isAlpha(char) {
    return char.length === 1 && char.match(/[a-z]/i);
}

export function isCharacterInWord(character, word){
    for(let inChar of word){
        if(inChar == character) return true;
    }
    return false;
}