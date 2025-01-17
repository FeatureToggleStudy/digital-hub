module.exports = `
<% #relatedContent %>
  <div class="item govuk-grid-column-one-quarter">
    <a data-featured-id="<% id %>" class="govuk-hub-featured-link" href="<% contentUrl %>">
      <article class="govuk-hub-featured-content-item small">
          <div data-featured-item-background="<% image.url %>" class="govuk-hub-featured-content-item__image" style="background-image:url(<% image.url %>)">
            <div class="govuk-hub-featured-content-item__overlay">
              <header class="govuk-hub-featured-content-item__header">
                <h3 data-featured-title="<% title %>" class="govuk-hub-featured-content-item__header-title govuk-heading-m govuk-!-font-size-24"><% title %></h3>
              </header>
              <div class="govuk-hub-featured-content-item__main">
                <p class="govuk-hub-featured-content-item__description govuk-body"><% summary %></p>
                <div title="<% linkText %>" class="govuk-hub-featured-content-item-icon govuk-hub-featured-content-item__main-play govuk-link"><span class="<% linkIcon %>"><span class="path1"></span><span class="path2"></span></span><span class="space"><% linkText %></span></div>
                <span class="govuk-hub-featured-content-item__main-icon <% iconType %>">
                  <span data-featured-item-duration="<% duration %>" class="govuk-body govuk-hub-featured-content-item__main-duration"> <% duration %></span>
                </span>
              </div>
              <div class="govuk-hub-featured-content-item__category-stripe govuk-hub-{{contentType}}"></div>
            </div>
          </div>
      </article>
    </a>
  </div>
<% /relatedContent %>
`;
