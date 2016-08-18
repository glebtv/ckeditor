source "http://rubygems.org"

gemspec

gem "rails", "4.2.7.1"

platforms :mri_18 do
  group :test do
    gem 'ruby-debug'
    gem 'SystemTimer'
  end
end

platforms :ruby do
  gem "sqlite3"

  group :development do
    gem "unicorn"
  end

  group :development, :test do
    gem 'jquery-rails'
    gem "capybara"
    gem "mynyml-redgreen", :require => 'redgreen'
  end

  group :active_record do
    gem 'paperclip'
    gem "carrierwave"
    gem "dragonfly"
    gem "mini_magick"
    gem "refile", require: "refile/rails"
    gem "refile-mini_magick"
  end

  group :mongoid do
    gem 'mongoid', '~> 5.0.0'
    gem "bson_ext"
    gem 'mongoid-paperclip', :require => 'mongoid_paperclip'
    gem 'carrierwave-mongoid', :require => 'carrierwave/mongoid'
  end
end
