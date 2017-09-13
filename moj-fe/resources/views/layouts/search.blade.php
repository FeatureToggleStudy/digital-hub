<!DOCTYPE html>
<html lang="{{ LaravelLocalization::getCurrentLocale() }}">
    <head>
        <script src="/js/jquery-1.12.4.min.js"></script>
        <script src="/js/bxslider/jquery.bxslider.min.js"></script>
        <script src="/js/video.min.js"></script>
        <script src="/js/global.js" type="text/javascript"></script>
        <script src="/js/news.js" type="text/javascript"></script>
        <script src="/js/video.js" type="text/javascript"></script>
        <script src="/js/jquery.modal.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="/js/bootstrap.js" type="text/javascript"></script>
        <title>Search: {{ $keywords }} </title>
        <link href="{{ elixir('css/app.css') }}" rel="stylesheet" type="text/css" />
        <link href="/js/bxslider/jquery.bxslider.css" rel="stylesheet" />
        <link href="/css/sprite.css" rel="stylesheet" type="text/css" />
        {!! App\Helpers\Piwik::trackingCode() !!}
    </head>

    <body>
    <div class="top-navigation new-content">
        <div class="row">
            <div class="col-xs-12">
                <a href="{{ $backlink }}" class="back-to-hub">
                    <span class="icon icon-icon-hub" aria-hidden="true"></span>
                    <div class="back-to-the-hub-text">
                        {{ trans('navigation.title') }}
                    </div>
                </a>

                <div class="navigation-title game-yellow">
                    {{ trans('navigation.searchtitle') }}
                </div>
            </div>
        </div>
    </div>

        @yield('top_content')

        <div id="content" class="container">
            @yield('content')
        </div>

        @if ( Route::currentRouteName() == 'hub.sub' || Route::currentRouteName() == 'hub.landing' )
        @else
        <footer class="footer">
            &copy; <?php echo date("Y"); ?> {{ trans('footer.message') }}
        </footer>
        @endif

        <div id="overlay" class="overlay"></div>

        <section id="notifaction" class="notifaction">



        </section>

    </body>
</html>


