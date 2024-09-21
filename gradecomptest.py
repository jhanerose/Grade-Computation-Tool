def gneed(prelimg, targetg):
    """
    Calculate the required midterm and final grades to achieve the target overall grade.
    
    Parameters:
    - prelimg: Grade received in prelims (0 to 100)
    - targetg: Desired overall grade (0 to 100)
    
    Returns:
    - A tuple with required midterm and final grades, and a message about pass possibility.
    """
    prelimweight = 0.20
    midtermweight = 0.30
    finalweight = 0.50

    # Calculate remaining grade needed after prelims
    remaininggrade = targetg - (prelimweight * prelimg)
    
    if midtermweight + finalweight == 0:
        return (None, None, "Invalid weights") 

    reqfinalgrade = (remaininggrade - (midtermweight * 100)) / finalweight

    if reqfinalgrade > 100:
        reqmidtermgrade = (remaininggrade - (finalweight * 100)) / midtermweight
        if reqmidtermgrade < 0 or reqmidtermgrade > 100:
            return (None, None, "It is difficult to pass.")
        return (reqmidtermgrade, 100, "You have a chance to pass!")

    if reqfinalgrade < 0:
        return (None, None, "It is difficult to pass.")
    
    return (100, reqfinalgrade, "You have a chance to pass!")

# Input handling
try:
    prelimg = float(input("Enter your prelim grade (0-100): "))
    if not (0 <= prelimg <= 100):
        raise ValueError("Prelim grade must be between 0 and 100.")

    targetg = 75  # Target passing grade
    midtermg, finalg, pass_message = gneed(prelimg, targetg)

    print(f"Prelim Grade: {prelimg}")
    if midtermg is None or finalg is None:
        print(pass_message)
    else:
        print(f"Required Midterm Grade: {midtermg:.2f}")
        print(f"Required Final Grade: {finalg:.2f}")
        print(pass_message)

    # Check for Dean's Lister
    deans_lister_target = 90
    dean_midtermg = (deans_lister_target - (0.20 * prelimg) - (0.50 * 100)) / 0.30
    dean_finalg = (deans_lister_target - (0.20 * prelimg) - (0.30 * 100)) / 0.50
    
    if 0 <= dean_midtermg <= 100 and 0 <= dean_finalg <= 100:
        print(f"To be a Dean's Lister, you need Midterm: {dean_midtermg:.2f} and Final: {dean_finalg:.2f}.")
    else:
        print("It is not possible to be a Dean's Lister with the current grades.")

except ValueError as e:
    print(e)
