<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<!--begin::Head-->
<head>
	@include('partials.dashboard.style')
</head>
<!--end::Head-->
<!--begin::Body-->
<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
	<!--begin::Main-->
	<!--begin::Header Mobile-->
	@include('partials.dashboard.mobile')
	<!--end::Header Mobile-->
	<div class="d-flex flex-column flex-root">
		<!--begin::Page-->
		<div class="d-flex flex-row flex-column-fluid page">
			<!--begin::Aside-->
			@include('partials.dashboard.aside')
			<!--end::Aside-->
			<!--begin::Wrapper-->
			<div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
				<!--begin::Header-->
				@include('partials.dashboard.header')
				<!--end::Header-->
				<!--begin::Content-->
				@include('partials.dashboard.content')
				<!--end::Content-->
				<!--begin::Footer-->
				@include('partials.dashboard.footer')
				<!--end::Footer-->
			</div>
			<!--end::Wrapper-->
		</div>
		<!--end::Page-->
		<!-- begin::User Panel-->
		@include('partials.dashboard.panel')
		<!-- end::User Panel-->
	</div>
	<!--end::Main-->
	@include('partials.dashboard.script')


</body>
<!--end::Body-->

</html>