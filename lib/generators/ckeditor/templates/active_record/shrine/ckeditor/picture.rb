# frozen_string_literal: true
module Ckeditor
  class PictureUploader < Shrine
    plugin :determine_mime_type
    plugin :validation_helpers
    plugin :derivatives

    Attacher.validate do
      validate_mime_type_inclusion %w[image/jpeg image/gif image/png]
      validate_max_size 2.megabytes
    end

    Attacher.derivatives do |original|
      magick = SHRINE_PICTURE_PROCESSOR.source(original)

      {
        content:  magick.resize_to_limit!(800, 800),
        thumb: magick.resize_to_limit!(118, 100),
      }
    end
  end

  class Picture < Ckeditor::Asset
    include PictureUploader.attachment(:data)

    before_create do
      data_derivatives!
    end

    before_update do
      data_derivatives! if data_changed?
    end


    validates :data, presence: true

    def url_content
      data_url(:content)
    end

    def url_thumb
      data_url(:thumb)
    end

    def path
      data[:thumb].storage.path(data[:thumb].id)
    end
  end
end
