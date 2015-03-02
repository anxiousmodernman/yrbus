from django.db import models


class Location(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, default='Home')
    latitude = models.DecimalField(max_digits=13, decimal_places=10, null=True)
    longitude = models.DecimalField(max_digits=13, decimal_places=10, null=True)
    owner = models.ForeignKey('auth.User', related_name='locations')
    stops = models.ForeignKey('yrbus.BusStop', related_name='stops', null=True)

    def save(self, *args, **kwargs):
        super(Location, self).save(*args, **kwargs)

    class Meta:
        ordering = ('name',)


class BusStop(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    wmata_stop_id = models.IntegerField()
    location = models.ForeignKey('yrbus.Location', related_name='location')

    def save(self, *args, **kwargs):
        super(BusStop, self).save(*args, **kwargs)

    class Meta:
        ordering = ('name',)


class BusRoute(models.Model):
    route_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        super(BusRoute, self).save(*args, **kwargs)

    class Meta:
        ordering = ('name',)