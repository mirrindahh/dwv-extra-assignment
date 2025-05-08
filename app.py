from flask import Flask, jsonify
import json

app = Flask(__name__)

# Load JSON data from a file
def load_data():
    with open('data.json') as f:
        return json.load(f)

@app.route('/data', methods=['GET'])
def get_data():
    data = load_data()
    
    # Prepare data for charts
    experience_counts = {
        "no experience": 0,
        "1-3 years": 0,
        "3+ years": 0
    }
    
    working_hours_counts = {
        "8 hours": 0,
        "10 hours": 0,
        "12 hours": 0
    }
    
    schedule_counts = {
        "5/2": 0,
        "2/2": 0,
        "Flexible": 0,
        "Shift work": 0
    }
    
    # Process your data to count occurrences for each category
    for job in data:
        # Experience
        experience = job['experience']
        if experience == 'no experience':
            experience_counts["no experience"] += 1
        elif experience == '1-3 years':
            experience_counts["1-3 years"] += 1
        else:
            experience_counts["3+ years"] += 1

        # Working hours
        for hours in job['working_hours']:
            if hours == 8:
                working_hours_counts["8 hours"] += 1
            elif hours == 10:
                working_hours_counts["10 hours"] += 1
            elif hours == 12:
                working_hours_counts["12 hours"] += 1

        # Schedule
        for schedule in job['schedule']:
            if schedule == "5/2":
                schedule_counts["5/2"] += 1
            elif schedule == "2/2":
                schedule_counts["2/2"] += 1
            elif schedule == "Flexible":
                schedule_counts["Flexible"] += 1
            elif schedule == "Shift work":
                schedule_counts["Shift work"] += 1

    # Return the data for charts in JSON format
    return jsonify({
        "experience": experience_counts,
        "working_hours": working_hours_counts,
        "schedule": schedule_counts
    })

if __name__ == '__main__':
    app.run(debug=True)
