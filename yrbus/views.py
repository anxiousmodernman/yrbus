from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from yrbus.models import BusStop, Location
from yrbus.serializers import UserSerializer, BusStopSerializer, LocationSerializer


class HomePage(generics.RetrieveAPIView):
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        return Response(data={'yr_mom': self.request.user}, template_name='index.html')


class BusStopList(generics.ListCreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = BusStopSerializer

    def get_queryset(self):
        user = self.request.user
        user_locations = Location.objects.filter(owner=user)
        return BusStop.objects.filter(location=user_locations)

    def perform_create(self, serializer):
        location = Location.objects.filter(id=self.request.data['location']).first()
        # todo Make sure it's okay for the client to always send the correct, 'active' id
        serializer.save(
            wmata_stop_id=self.request.data['wmata_stop_id'],
            name=self.request.data['name'],
            location=location
        )


class LocationList(generics.ListCreateAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LocationSerializer

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'yrbus': reverse('snippet-list', request=request, format=format)
    })



