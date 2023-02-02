import 'package:intl/intl.dart';

String pesoCurrency() {
  var format = NumberFormat.simpleCurrency(name: "PHP");

  return format.currencySymbol;
}
