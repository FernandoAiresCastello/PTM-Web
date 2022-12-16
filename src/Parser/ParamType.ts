export enum ParamType {
    
    Undefined, 
    NumberLiteral,          // 255, &hff, &b11111111
    CharLiteral,            // 'a'
    StringLiteral,          // "Hello world!"
    Identifier,             // an_identifier
    ArrayIxLiteral,         // array[1]
    ArrayIxVarIdentifier    // array[var_id]
}
