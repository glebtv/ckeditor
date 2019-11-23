# frozen_string_literal: true

module Ckeditor
  module Orm
    module Base
      module AssetBase
        module InstanceMethods
          def filename
            data_file_name
          end
          def fileName
            filename
          end

          def size
            data_file_size
          end

          def has_dimensions?
            respond_to?(:width) && respond_to?(:height)
          end

          def image?
            Ckeditor::IMAGE_TYPES.include?(data_content_type)
          end

          def format_created_at
            I18n.l(created_at, format: :short)
          end

          def url_content
            url
          end

          def url_thumb
            url(:thumb)
          end

          def uploaded
            1
          end

          def as_json_methods
            [:url, :url_content, :url_thumb, :size, :filename, :fileName, :format_created_at, :uploaded]
          end

          def as_json(options = nil)
            options = {
              methods: as_json_methods,
              #root: 'asset'
            }.merge!(options || {})

            super(options)
          end
        end
      end
    end
  end
end
