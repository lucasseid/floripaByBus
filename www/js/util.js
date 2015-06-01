function get_baseurl_for_call(){
    return "https://WKD4N7YMA1uiM8V:DtdTtzMLQlA0hk2C1Yi5pLyVIlAQ68@api.appglu.com/v1/queries/";
}

function empty(mixed_var) {

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === 'object') {
    for (key in mixed_var) {
      return false;
    }
    return true;
  }

  return false;
}

function get_post_by_endpoint(endpoint)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", get_baseurl_for_call()+endpoint);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-AppGlu-Environment", "staging");

    return xhr;
}

function sort_by_sequence(a, b){
  var aPos = a.sequence;
  var bPos = b.sequence;
  return ((aPos < bPos) ? -1 : ((aPos > bPos) ? 1 : 0));
}
