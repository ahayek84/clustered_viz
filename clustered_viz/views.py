from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages

# Create your views here.

def home(request):
    return render(request, 'home/index.html', {})

def graph(request):
    return render(request, 'graph_scroller/index.html', {})


def sunburst(request):
    return render(request, 'sunburst/index.html', {})