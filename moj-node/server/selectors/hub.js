const R = require('ramda');

module.exports.idFrom = R.view(R.lensPath(['nid', 0, 'value']));
module.exports.tagIdFrom = R.view(R.lensPath(['tid', 0, 'value']));
module.exports.titleFrom = R.view(R.lensPath(['title', 0, 'value']));
module.exports.contentTypeFrom = R.view(R.lensPath(['type', 0, 'target_id']));
module.exports.vocabularyType = R.view(R.lensPath(['vid', 0, 'target_id']));
module.exports.descriptionValueFrom = R.view(
  R.lensPath(['field_moj_description', 0, 'value']),
);
module.exports.descriptionProcessedFrom = R.view(
  R.lensPath(['field_moj_description', 0, 'processed']),
);
module.exports.termDescriptionValueFrom = R.view(
  R.lensPath(['description', 0, 'value']),
);
module.exports.termDescriptionProcessedFrom = R.view(
  R.lensPath(['description', 0, 'processed']),
);
module.exports.summaryValueFrom = R.view(
  R.lensPath(['field_moj_description', 0, 'summary']),
);
module.exports.imageAltFrom = R.view(
  R.lensPath(['field_moj_thumbnail_image', 0, 'alt']),
);
module.exports.imageUrlFrom = R.view(
  R.lensPath(['field_moj_thumbnail_image', 0, 'url']),
);

module.exports.featuredImageUrlFrom = R.view(
  R.lensPath(['field_featured_image', 0, 'url']),
);
module.exports.featuredImageAltFrom = R.view(
  R.lensPath(['field_featured_image', 0, 'alt']),
);

module.exports.featuredVideoUrlFrom = R.view(
  R.lensPath(['field_featured_video', 0, 'url']),
);

module.exports.featuredAudioUrlFrom = R.view(
  R.lensPath(['field_featured_audio', 0, 'url']),
);

module.exports.durationFrom = R.view(
  R.lensPath(['field_moj_duration', 0, 'value']),
);
module.exports.audioUrlFrom = R.view(R.lensPath(['field_moj_audio', 0, 'url']));
module.exports.videoUrlFrom = R.view(R.lensPath(['field_moj_video', 0, 'url']));
module.exports.seriesIdFrom = R.view(
  R.lensPath(['field_moj_series', 0, 'target_id']),
);
module.exports.episodeFrom = R.view(
  R.lensPath(['field_moj_episode', 0, 'value']),
);
module.exports.seasonFrom = R.view(
  R.lensPath(['field_moj_season', 0, 'value']),
);
module.exports.standFirstFrom = R.view(
  R.lensPath(['field_moj_stand_first', 0, 'value']),
);
module.exports.nameFrom = R.view(R.lensPath(['name', 0, 'value']));
module.exports.landingFeaturedContentIdFrom = R.view(
  R.lensPath(['field_moj_landing_feature_contet', 0, 'target_id']),
);
module.exports.categoryIdFrom = R.view(
  R.lensPath(['field_moj_landing_page_term', 0, 'target_id']),
);
module.exports.pdfUrlFrom = R.view(R.lensPath(['field_moj_pdf', 0, 'url']));
module.exports.tagsIdsFrom = R.compose(
  R.map(R.prop('target_id')),
  R.prop('field_moj_top_level_categories'),
);
module.exports.createdAtFrom = R.view(R.lensPath(['created', 0, 'value']));
module.exports.establishmentIdFrom = R.view(
  R.lensPath(['field_moj_prisons', 0, 'target_id']),
);
module.exports.titleFrom = R.view(
  R.lensPath(['field_moj_landing_page_term', 0, 'target_id']),
);
