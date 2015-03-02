from rest_framework import serializers
from django.contrib.auth.models import User
from yrbus.models import BusStop
from yrbus.models import Location


class UserSerializer(serializers.ModelSerializer):
    locations = serializers.PrimaryKeyRelatedField(many=True, queryset=Location.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'yrbus', 'locations')


class BusStopSerializer(serializers.ModelSerializer):

    class Meta:
        model = BusStop
        fields = ('wmata_stop_id', 'name', 'location')


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ('id', 'name', 'latitude', 'longitude', 'stops',)


