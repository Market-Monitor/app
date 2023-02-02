import 'package:flutter/material.dart';
import 'package:iconify_flutter/iconify_flutter.dart'; // For Iconify Widget
import 'package:iconify_flutter/icons/game_icons.dart';
import 'package:iconify_flutter/icons/mdi.dart';
import 'package:iconify_flutter/icons/healthicons.dart';
import 'package:tailwind_colors/tailwind_colors.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<StatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        title: const Text(
          "MarketMonitor",
          style: TextStyle(fontWeight: FontWeight.w900),
        ),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () {},
        ),
        actions: [
          IconButton(onPressed: () {}, icon: const Icon(Icons.search)),
          IconButton(onPressed: () {}, icon: const Icon(Icons.more_vert))
        ],
      ),
      body: CustomScrollView(slivers: [
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          sliver: SliverList(
              delegate: SliverChildListDelegate([
            Container(
              padding: const EdgeInsets.only(bottom: 5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(bottom: 5),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Today's Agricultural Products from",
                            style: TextStyle(
                                fontWeight: FontWeight.w900,
                                fontSize: 24,
                                color: TW3Colors.gray.shade700)),
                        const Text("La Trinidad Trading Post",
                            style: TextStyle(
                                fontWeight: FontWeight.w900,
                                fontSize: 24,
                                color: TW3Colors.emerald)),
                      ],
                    ),
                  ),
                  Text("The following prices are references for Farmers only",
                      style: TextStyle(
                          fontSize: 17, color: TW3Colors.gray.shade400))
                ],
              ),
            ),
            Divider(
              thickness: 1,
              color: TW3Colors.gray.shade100,
            ),
            Container(
                decoration: BoxDecoration(
                    border: Border.all(color: TW3Colors.gray.shade100),
                    borderRadius: BorderRadius.circular(10),
                    color: TW3Colors.gray.shade50),
                margin: const EdgeInsets.symmetric(vertical: 10),
                padding: const EdgeInsets.only(
                    left: 15, right: 15, top: 5, bottom: 15),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Iconify(
                              GameIcons.cabbage,
                              size: 18,
                              color: TW3Colors.emerald.shade600,
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 5),
                              child: Text(
                                "Cabbage Wonderball",
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w800,
                                    color: TW3Colors.emerald.shade600),
                              ),
                            )
                          ],
                        ),
                        IconButton(
                            onPressed: () {},
                            icon: const Icon(Icons.bookmark_border))
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(children: [
                        Padding(
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  "1st Class",
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600),
                                ),
                                Row(
                                  children: [
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("23",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                    const Padding(
                                      padding:
                                          EdgeInsets.symmetric(horizontal: 10),
                                      child: Text("-"),
                                    ),
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("27",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            )),
                        Padding(
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  "2nd Class",
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600),
                                ),
                                Row(
                                  children: [
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("23",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                    const Padding(
                                      padding:
                                          EdgeInsets.symmetric(horizontal: 10),
                                      child: Text("-"),
                                    ),
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("27",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            )),
                      ]),
                    )
                  ],
                )),
            Container(
                decoration: BoxDecoration(
                    border: Border.all(color: TW3Colors.gray.shade100),
                    borderRadius: BorderRadius.circular(10),
                    color: TW3Colors.gray.shade50),
                margin: const EdgeInsets.symmetric(vertical: 10),
                padding: const EdgeInsets.only(
                    left: 15, right: 15, top: 5, bottom: 15),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Iconify(
                              GameIcons.broccoli,
                              size: 18,
                              color: TW3Colors.emerald.shade600,
                            ),
                            Padding(
                              padding: const EdgeInsets.only(left: 5),
                              child: Text(
                                "Brocolli",
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w800,
                                    color: TW3Colors.emerald.shade600),
                              ),
                            )
                          ],
                        ),
                        IconButton(
                            onPressed: () {},
                            icon: const Icon(Icons.bookmark_border))
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(children: [
                        Padding(
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  "Trimmed",
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600),
                                ),
                                Row(
                                  children: [
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("23",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                    const Padding(
                                      padding:
                                          EdgeInsets.symmetric(horizontal: 10),
                                      child: Text("-"),
                                    ),
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("27",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            )),
                        Padding(
                            padding: const EdgeInsets.symmetric(vertical: 5),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                const Text(
                                  "Untrimmed",
                                  style: TextStyle(
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600),
                                ),
                                Row(
                                  children: [
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("23",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                    const Padding(
                                      padding:
                                          EdgeInsets.symmetric(horizontal: 10),
                                      child: Text("-"),
                                    ),
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.center,
                                      children: const [
                                        Iconify(Mdi.philippine_peso, size: 14),
                                        Padding(
                                          padding: EdgeInsets.only(left: 2),
                                          child: Text("27",
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w900,
                                                  fontSize: 16)),
                                        )
                                      ],
                                    ),
                                  ],
                                )
                              ],
                            )),
                      ]),
                    )
                  ],
                ))
          ])),
        ),
        SliverFillRemaining(
          hasScrollBody: false,
          child: Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                  width: double.infinity,
                  height: 75,
                  decoration: BoxDecoration(
                    borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(25),
                        topRight: Radius.circular(25)),
                    color: TW3Colors.gray.shade100,
                  ),
                  child: Center(
                      child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Row(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Column(
                              children: [
                                const Iconify(Healthicons.market_stall),
                                Container(
                                  margin: const EdgeInsets.only(top: 4),
                                  child: const Text("Market"),
                                )
                              ],
                            ),
                            Column(
                              children: [
                                const Icon(Icons.bookmark),
                                Container(
                                  margin: const EdgeInsets.only(top: 4),
                                  child: const Text("Portfolio"),
                                )
                              ],
                            ),
                            Column(
                              children: [
                                const Icon(Icons.search),
                                Container(
                                  margin: const EdgeInsets.only(top: 4),
                                  child: const Text("Search"),
                                )
                              ],
                            ),
                            Column(
                              children: [
                                const Icon(Icons.person),
                                Container(
                                  margin: const EdgeInsets.only(top: 4),
                                  child: const Text("Account"),
                                )
                              ],
                            )
                          ]),
                    ],
                  )))),
        )
      ]),
    );
  }
}
