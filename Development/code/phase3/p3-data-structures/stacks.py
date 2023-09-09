  # Problem 
# Implement a function is_balanced(expression) that takes a string 
# containing parentheses, curly braces, and square brackets,and determines whether 
# the expression is balanced. 

# An expression is considered balanced if each opening bracket has a corresponding closing 
# bracket in the correct order.

# sample input = 

# expression1 = "([]{})"
# expression2 = "([)]"
# print(is_balanced(expression1))  # Output: True
# print(is_balanced(expression2))  # Output: False


# Solution
def is_balanced(expression):
    # Define a mapping of opening to closing brackets
    bracket_map = {')': '(', '}': '{', ']': '['}
    
    # Initialize an empty stack to keep track of opening brackets
    stack = []
    
    # Iterate through each character in the expression
    for char in expression:
        if char in '([{':
            # If it's an opening bracket, push it onto the stack
            stack.append(char)
        elif char in ')]}':
            # If it's a closing bracket, check if the stack is empty or
            # if the top of the stack matches the corresponding opening bracket
            if not stack or stack.pop() != bracket_map[char]:
                return False
    
    # If the stack is empty at the end, the expression is balanced
    return not stack

# Sample input
expression1 = "([]{})"
expression2 = "([)]"
print(is_balanced(expression1))  
print(is_balanced(expression2))  
