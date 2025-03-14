import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.toISOString(); // Convert outgoing Date to ISO String for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hardcoded AST string to integer and then to Date
        }
        return null; // Invalid hardcoded value (not an integer)
    },
});

export const DateTime = dateScalar;