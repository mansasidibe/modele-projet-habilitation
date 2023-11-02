<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<HEAD>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!--begin::Fonts-->
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=lato:300,400,500,600,700" />
    <!-- Icon -->
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('/front/img/favicon.png') }}">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <!-- Scripts {{ asset('front/img/favicon.png') }}-->
    <link rel="stylesheet" type="text/css" href="{{ asset('/front/css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/front/css/font-awesome.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/front/css/style.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/front/css/responsives.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    @yield("style")
</HEAD>

<body class="g-0">
