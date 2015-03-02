from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from yrbus import views

from django.conf.urls import url, include

# API endpoints
urlpatterns = format_suffix_patterns([
    url(r'^$', views.HomePage.as_view()),
    url(r'^users/$', views.UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^stops/$', views.BusStopList.as_view(), name='stops-list'),
    url(r'^locations/$', views.LocationList.as_view(), name='location-list'),
])

# Login and logout views for the browsable API
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
