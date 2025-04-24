@app.task(bind=True)
def debug_task(self):
    print("Worker received task!")
    return "debug task works"