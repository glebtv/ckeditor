module RailsAdmin::Config::Fields::Types
  class Ckeditor < RailsAdmin::Config::Fields::Types::Text
    RailsAdmin::Config::Fields::Types::register(:ckeditor, self)
    register_instance_option :config_js do
      nil
    end

    register_instance_option :location do
      nil
    end

    register_instance_option :base_location do
      "#{Rails.application.config.assets.prefix}/ckeditor/"
    end

    register_instance_option :partial do
      :form_ck_editor
    end
  end
end
