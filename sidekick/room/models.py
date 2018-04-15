from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=200)
    home = models.CharField(max_length=200)
    guest = models.CharField(max_length=200)
    yt_src = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    body = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name + ": " + self.body

class Watcher(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Bet(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    value = models.CharField(max_length=200)

    def __str__(self):
        return self.name + " - " + self.value 

