# frozen_string_literal: true

module Ckeditor
  module Backend
    module Shrine
      def self.included(base)
        base.send(:include, InstanceMethods)
      end

      module InstanceMethods
        def url
          data_url
        end

        def filename
          datasource['filename']
        end

        def size
          datasource['size']
        end

        def datasource
          data.metadata
        end
      end
    end
  end
end
