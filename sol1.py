# Specifications
# 1.	Clock Data:
# o	The clock times are provided in a 24-hour format.
# o	The Grand Clock Tower is at 15:00.
# o	Clock times around town:
# 	Clock 1: 14:45
# 	Clock 2: 15:05
# 	Clock 3: 15:00
# 	Clock 4: 14:40
# 2.	Time Analysis and Output:
# o	You need to determine how many minutes each clock is ahead or behind the Grand Clock Tower.
# o	The result should be an array of integers representing the time difference in minutes. Positive values indicate the clock is ahead, and negative values indicate it's behind.
# Constraints
# •	Use GitHub Copilot and write the simulation in any language you'd like.
# •	Focus on clear and concise code. Ask GitHub Copilot/Chat, "How can I make this code more readable and maintainable?".
# Summary of High-Level Tasks to Perform
# 1.	Use a console application to render the output.
# 2.	Parse the time data for each clock and the Grand Clock Tower.
# 3.	Calculate the difference in minutes between each clock and the Grand Clock Tower.
# 4.	Output the list of time differences.
grand_clock_time = "15:00"
ans=[]
clocks = ["14:45", "five", "15:00", "14:40"]
def time_to_minutes(time_str):
    """Convert a time string in HH:MM format to total minutes."""
    hours, minutes = map(int, time_str.split(':'))
    return (hours * 60) + minutes 
gct= time_to_minutes(grand_clock_time)

for i in clocks:
    try:
        #tries to convert the clock time and gives an error if it fails due to an invalid format
        clock_time = time_to_minutes(i) 
        ans.append(clock_time - gct) 
    except ValueError:
        #ans.append("Invalid time format: " + i)
        print("invalid format: " + i)
print(ans)
# Output the result